import constants from '../constants';

export const isInvestor = userType => userType === constants.userRole.investor;
export const isEntrepreneur = userType => userType === constants.userRole.entrepreneur;