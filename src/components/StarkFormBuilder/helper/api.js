import { Component } from 'react';

export default class Api extends Component {
  static s3url = 'https://peepal-tree.s3.ap-south-1.amazonaws.com/';

  static baseUrl = Api.getBaseUrl();

  static loginUrl = `${Api.baseUrl}login/`;

  static forgotPasswordUrl = `${Api.baseUrl}forget-password/`;

  static resetPasswordUrl = `${Api.baseUrl}reset-password/`;

  static tokenVerifyUrl = `${Api.baseUrl}password/find/`;

  static subjectUrl = `${Api.baseUrl}subjects/`;

  static schoolYearUrl = `${Api.baseUrl}class/`;

  static locationUrl = `${Api.baseUrl}locations/`;

  static tutorUrl = `${Api.baseUrl}tutor/`;

  static studentUrl = `${Api.baseUrl}student/`;

  static getProfileByIdUrl = `${Api.baseUrl}profile/`;

  static getBulkStatus = `${Api.baseUrl}study-material-bulk-delete/`;

  static changePasswordUrl = `${Api.baseUrl}change-password/`;

  static getManageStudyMaterialByUrl = `${Api.baseUrl}study-material/`;

  static studentRegistrationUrl = `${Api.baseUrl}registration/`;

  static studentTutorSubjectUrl = `${Api.baseUrl}student-tutor-subjects/`;

  static studentBulkStatus = `${Api.baseUrl}bulk-status/`;

  static getManageHomeworkByUrl = `${Api.baseUrl}homework/`;

  static getTutorHomeworkStudentByTutorIdUrl = `${Api.baseUrl}tutor-homework-student/`;

  static verifyEmailUrl = `${Api.baseUrl}user-verify-email/`;

  static getTutorClassSubjectByUrl = `${Api.baseUrl}tutor-class-subjects/`;

  static getStudentTutorSubjectUrl = `${Api.baseUrl}student-tutor-subjects/`;

  static getHomeworkThreadByRefId = `${Api.baseUrl}homework-thread/`;

  static getVirtualClassByUrl = `${Api.baseUrl}virtual-class/`;

  static studentActivateUrl = `${Api.baseUrl}student-change-status/`;

  static virtualClassUrl = `${Api.baseUrl}virtual-class/`;

  static timeZoneUrl = `${Api.baseUrl}vs-timezones/`;

  static deleteVirtualClassUrl = `${Api.baseUrl}virtual-class/`;

  static virtualClassStudentUrl = `${Api.baseUrl}virtual-class-students/`;

  static languagesUrl = `${Api.baseUrl}vs-languages/`;

  static graphApiHomework = `${Api.baseUrl}homework-student-count/`;

  static graphApiVirtualClass = `${Api.baseUrl}virtual-student-count/`;

  // masquerade user
  static userImpersonateUrl = `${Api.baseUrl}user-impersonate/`;

  static classAttendanceUrl = `${Api.baseUrl}class-aattendance/`;

  static adminDashboardUrl = `${Api.baseUrl}admin-dashboard/`;

  static dashboardUrl = `${Api.baseUrl}dashboard/`;
  
  static calenderUrl = `${Api.baseUrl}calender/`;

  // Get base URL of APIs
  static getBaseUrl() {
    const env = 'dev';
    let url = '';
    switch (env) {
      case 'production':
        url = '';
        break;
      // Default: development server
      // https://w5bkyj7v1b.execute-api.ap-south-1.amazonaws.com/dev/api/v1/
      default:
        url =
          'https://iblypkr3ef.execute-api.eu-west-2.amazonaws.com/staging/api/v1/';
        break;
    }
    return url;
  }

  environment;

  constructor(props) {
    super(props);
    this.state = {};
    this.getBaseUrl = this.getBaseUrl.bind(this);
  }
}