import RestClient from "utils/RestClient"

const getMerchantById = (id) => RestClient.Get(`/api/merchant/${id}`);

const getMerchantCourses = (id) => RestClient.Get(`/api/merchantCourse/${id}`);

const getMerchantLocations = (id) => RestClient.Get(`/api/merchantLocation/${id}`);

const getMerchantSchedules = (id) => RestClient.Get(`/api/merchantCourseSchedule/${id}`);

const getMerchantContacts = (id) => RestClient.Get(`/api/merchantContact/${id}`);

const getMerchantSchedulesLoaction = (id, locationId) => RestClient.Get(`/api/merchantCourseSchedule/${id}/${locationId}`);

const createMerchantLocation = (temp) => RestClient.Post(`/api/merchantLocation`, temp);

const createMerchantCourse = (temp) => RestClient.Post(`/api/merchantCourse`, temp);

const createMerchantContact = (temp) => RestClient.Post(`/api/merchantContact`, temp);

const createMerchantWeeklySchedule = (temp) => RestClient.Post(`/api/merchantCourseWeeklySchedule`, temp);

const createMerchantMonthlySchedule = (temp) => RestClient.Post(`/api/merchantCourseMonthlySchedule`, temp);

const updateMerchant = (merchantId, temp) => RestClient.Put(`/api/merchant/${merchantId}`, temp);

const updateMerchantLocation = (locationId, temp) => RestClient.Put(`/api/merchantLocation/${locationId}`, temp);

const updateMerchantCourse = (courseId, temp) => RestClient.Put(`/api/merchantCourse/${courseId}`, temp);

const updateMerchantContact = (contactId, temp) => RestClient.Put(`/api/merchantContact/${contactId}`, temp);

const updateMerchantMonthlySchedule = (scheduleId, temp) => RestClient.Put(`/api/merchantCourseMonthlySchedule/${scheduleId}`, temp);

const updateMerchantWeeklySchedule = (scheduleId, temp) => RestClient.Put(`/api/merchantCourseWeeklySchedule/${scheduleId}`, temp);

const deleteMerchantSchedule = (scheduleId) => RestClient.Delete(`/api/merchantCourseSchedule/${scheduleId}`);

const deleteMerchantLocation = (id) => RestClient.Delete(`/api/merchantLocation/${id}`);

const deleteMerchantCourse = (courseId) => RestClient.Delete(`/api/merchantCourse/${courseId}`);


export default { getMerchantById, getMerchantLocations, getMerchantCourses, getMerchantSchedules, getMerchantContacts, getMerchantSchedulesLoaction, createMerchantCourse, createMerchantLocation, createMerchantContact, createMerchantWeeklySchedule, createMerchantMonthlySchedule, updateMerchant, updateMerchantLocation, updateMerchantCourse, updateMerchantContact, updateMerchantMonthlySchedule, updateMerchantWeeklySchedule, deleteMerchantSchedule, deleteMerchantLocation, deleteMerchantCourse }