import PropTypes, {
  shape,
  // number,
  string,
  boolean
  // func,
  // oneOf
} from 'prop-types';

export const meetingType = shape({
  id: string,
  name: string,
  description: string,
  location: string,
  startDate: string,
  endDate: string,
  public: boolean,
  website: string,
  adminToken: string
});

export default PropTypes.any;
