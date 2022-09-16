import * as auth from './auth';
import * as community from './community'
import * as verifyurl from './verifyurl'
import * as booking from './booking'
import * as vehicle from './vehicle'
import * as upload from './upload'
import * as yard from './yard'

export default {
    ...auth,
    ...community,
    ...verifyurl,
    ...booking,
    ...vehicle,
    ...upload,
    ...yard
}