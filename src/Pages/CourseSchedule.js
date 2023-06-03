import { CardBody } from 'reactstrap'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
// core components
import React, { useEffect, useRef, useState } from 'react'
import UserHeader from 'components/Headers/UserHeader.js'
import AddSchedule from 'components/Modals/AddSchedule'
import moment from 'moment'
import CustomSelect from 'components/Global/CustomSelect'
import { useSelector } from 'react-redux'
import Loader from 'components/Global/Loader'
import MerchantService from 'Services/MerchantService'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from "@fullcalendar/interaction"
import timePlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import listPlugin from '@fullcalendar/list';
import AdminNavbar from 'components/Navbars/AdminNavbar'
import { toast } from 'react-toastify'
import Layout from 'components/Global/Layout'
import Footer from 'components/Footer'



const CourseSchedule = () => {
  const merchantLocations = useSelector(state => state.authUser.courseLocations)?.filter(x => x?.is_main_location !== 'Y');
  const merchantId = useSelector(state => state.authUser.merchant_Id);
  const calendarRef = useRef();
  const [currentView, setCurrentView] = useState('timeGridWeek')
  const [monthEvents, setMonthEvents] = React.useState([])
  const [weekEvents, setWeekEvents] = React.useState([])
  const [isModalOpen, setModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  const [eventData, setEventData] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null);




  const addEvent = (event) => {
    setEventData(event)
    setModal(!isModalOpen)
  }

  const getSchedules = () => {
    setIsLoaded(false);
    if (selectedLocation) {
      MerchantService.getMerchantSchedulesLoaction(merchantId, selectedLocation)
        .then(res => {
          let tempMonthList = [];
          let tempWeekList = [];
          
          if (res.status === 'success') {
            res.data?.map(x => {
              if (x.week_day && x.is_recurring === "Y") {
                tempWeekList.push({
                  title: x.course_name,
                  startTime: x.start_time,
                  start_date: x.start_date,
                  end_date: x.end_date,
                  endTime: x.end_time,
                  remaining_spots: x.remaining_spots,
                  total_spots: x.total_spots,
                  backgroundColor: `#${x?.course_calendar_color_hex}`,
                  daysOfWeek: [moment(x?.week_day, 'dd').format('d')],
                  location: x.location_id,
                  course: x.course_id,
                  course_mode: x.course_mode,
                  billing_type_code: x.billing_type_code,
                  fees: x.fees,
                  schedule_id: x.schedule_id
                })
              } else {
                tempMonthList.push({
                  title: x.course_name,
                  start: x.start_date,
                  end: x.end_date,
                  end_date: x.end_date,
                  start_Time: x.start_time,
                  end_Time: x.end_time,
                  backgroundColor: `#${x?.course_calendar_color_hex}`,
                  location: x.location_id,
                  course: x.course_id,
                  course_mode: x.course_mode,
                  billing_type_code: x.billing_type_code,
                  fees: x.fees,
                  remaining_spots: x.remaining_spots,
                  total_spots: x.total_spots,
                  schedule_id: x.schedule_id,
                })
              }
            })
            setMonthEvents(tempMonthList);
            setWeekEvents(tempWeekList);
          } else {
            setMonthEvents([]);
            setWeekEvents([]);
          }
          setIsLoaded(true);
        })
        .catch(err => setIsLoaded(true))
    }
  }
  useEffect(() => {
    setSelectedLocation(merchantLocations[0]?.location_id);
  }, [])
  useEffect(() => {
    getSchedules();
    const controller = new AbortController();
    return () => controller.abort();
  }, [selectedLocation])

  const renderEventContent = (eventInfo) => {
    return (
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '10px' }}>{eventInfo.event.title}</span>
        <span style={{ fontSize: '10px' }}>{eventInfo.event.extendedProps.start_Time ? moment(eventInfo.event.extendedProps.start_Time, 'hh:mm A').format('hh:mm A') : moment(eventInfo.event.start).format('hh:mm')} - {eventInfo.event.extendedProps.end_Time ? moment(eventInfo.event.extendedProps.end_Time, 'hh:mm A').format('hh:mm A') : moment(eventInfo.event.end).format('hh:mm')}</span>
        {eventInfo.event.extendedProps.remaining_spots && <span style={{ fontSize: '10px' }}>Available Slots {eventInfo.event.extendedProps.remaining_spots}/{eventInfo.event.extendedProps.total_spots}</span>}
      </span>
    )
  }
  const handleViewChange = (e, val) => {
    calendarRef.current.calendar.changeView(val);
    setCurrentView(val)
  };
  console.log("tempWeekList",weekEvents)
  return (
    <>
      <AdminNavbar
        brandText={"Course Schedule"}
      />
      <UserHeader />
      {isLoaded ?
        <Layout>
          <CardBody>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={currentView}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleViewChange}>
                    <Tab label="Recurring Schedules" value="timeGridWeek" />
                    <Tab label="One Time Schedules" value="dayGridMonth" />
                    <Tab label="All Schedules" value="listMonth" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
            <br />
            <CustomSelect
              data={merchantLocations ?? []}
              label='Select Course Location'
              className='mb-2'
              handleChange={(e) => setSelectedLocation(e.target.value)}
              defaultVal={selectedLocation}
            />
            <div className="wrapper">
              <FullCalendar
                ref={calendarRef}
                dayHeaderContent={(args) => {
                  return moment(args.date).format('dddd')
                }}
                plugins={[interactionPlugin, dayGridPlugin, timePlugin, listPlugin]}
                initialView={currentView}
                eventContent={renderEventContent}
                events={currentView === 'timeGridWeek' ? weekEvents : monthEvents}
                eventClick={(info) => {
                  if (selectedLocation) {
                    addEvent(info.event)
                  } else {
                    toast("Please select location first!", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'error',
                    });
                  }
                }}
                dragScroll={true}
                headerToolbar={currentView === 'dayGridMonth' && {
                  start: '',
                  center: 'title',
                  end: 'prev,next',
                }}
                selectable={true}
                allDaySlot={false}
                select={(e) => {
                  if (selectedLocation) {
                    addEvent(e)
                  } else {
                    toast("Please select location first!", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'error',
                    });
                  }
                }}
                selectMirror={true}
                expandRows={true}
                dayMaxEvents={false}
                height='95vh'
                dayMaxEventRows={false}
                eventDisplay='block'
              />
            </div>
            <AddSchedule
              isModalOpen={isModalOpen}
              toggleModal={() => setModal(!isModalOpen)}
              eventData={eventData}
              merchantId={merchantId}
              currentView={currentView}
              getSchedules={getSchedules}
              selectedLocation={{ name: merchantLocations?.filter(x => x.location_id === selectedLocation)[0]?.location_name, location_id: merchantLocations?.filter(x => x.location_id === selectedLocation)[0]?.location_id }}
            />
          </CardBody>
        </Layout>
        :
        <Loader open={!isLoaded ? true : false} />
      }
      <Footer containerStyle={{ position: isLoaded ? 'static' : 'absolute' }} />
    </>
  )
}

export default CourseSchedule
