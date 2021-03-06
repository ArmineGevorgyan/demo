import React from "react";
import CursorIcon from "../../assets/cursor.svg";
import NotificationIcon from "../../assets/notification.svg";
import PreferencesIcon from "../../assets/preferences.svg";
import ParkingLotIcon from "../../assets/parkingmeter.svg";
import PasswordIcon from "../../assets/password.svg";
import LogoutIcon from "../../assets/log-out.svg";
import DeleteAccountIcon from "../../assets/delete-account.svg";
import { colors } from "../styles/colors";
import constants from "../constants";

export const getSectionData = (userRole) => {
  return userRole === constants.userRole.investor
    ? investorData
    : entrepreneurData;
};

const investorData = [
  [
    {
      id: 1,
      value: "personalDetails",
      icon: "user",
      iconType: "Feather",
      backgroundColor: colors.profileSection1,
      to: "InvestorProfileEditScreen",
    },
    {
      id: 2,
      value: "integration",
      svg: <CursorIcon />,
      backgroundColor: colors.profileSection1,
      to: "TemporaryScreen",
    },
    {
      id: 3,
      value: "notification",
      svg: <NotificationIcon />,
      backgroundColor: colors.profileSection1,
      to: "NotificationsScreen",
    },
  ],
  [
    {
      id: 4,
      value: "preferences",
      svg: <PreferencesIcon />,
      backgroundColor: colors.profileSection2,
      to: "TemporaryScreen",
    },
    {
      id: 5,
      value: "passedDeals",
      svg: <ParkingLotIcon />,
      backgroundColor: colors.profileSection2,
      to: "PassedDealsScreen",
    },
  ],
  [
    {
      id: 6,
      value: "faq",
      icon: "help",
      iconType: "MaterialCommunityIcons",
      backgroundColor: colors.profileSection3,
      to: "FAQScreen",
    },
    {
      id: 7,
      value: "contactUs",
      icon: "mail",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "ContactUsScreen",
    },
    {
      id: 8,
      value: "legal",
      icon: "file-text",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "LegalScreen",
    },
  ],
  [
    {
      id: 9,
      value: "resetPassword",
      svg: <PasswordIcon />,
      backgroundColor: colors.profileSection4,
      to: "ForgotPasswordScreen",
    },
    {
      id: 10,
      value: "logout",
      svg: <LogoutIcon />,
      backgroundColor: colors.profileSection4,
    },
    {
      id: 11,
      value: "deleteAccount",
      svg: <DeleteAccountIcon />,
      backgroundColor: colors.profileSection4,
    },
  ],
];

const entrepreneurData = [
  [
    {
      id: 1,
      value: "personalDetails",
      icon: "user",
      iconType: "Feather",
      backgroundColor: colors.profileSection1,
      to: "EntProfileEditScreen",
    },
    {
      id: 2,
      value: "notification",
      svg: <NotificationIcon />,
      backgroundColor: colors.profileSection1,
      to: "NotificationsScreen",
    },
  ],
  [
    {
      id: 3,
      value: "faq",
      icon: "help",
      iconType: "MaterialCommunityIcons",
      backgroundColor: colors.profileSection3,
      to: "FAQScreen",
    },
    {
      id: 4,
      value: "contactUs",
      icon: "mail",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "ContactUsScreen",
    },
    {
      id: 5,
      value: "legal",
      icon: "file-text",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "LegalScreen",
    },
    {
      id: 6,
      value: "helpGuide",
      icon: "life-buoy",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "TemporaryScreen",
    },
  ],
  [
    {
      id: 7,
      value: "resetPassword",
      svg: <PasswordIcon />,
      backgroundColor: colors.profileSection4,
      to: "ForgotPasswordScreen",
    },
    {
      id: 8,
      value: "logout",
      svg: <LogoutIcon />,
      backgroundColor: colors.profileSection4,
    },
  ],
];

export const getSectionBorderStyle = (index, sectionLength) => {
  if (index === 0) {
    return {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    };
  }
  if (index === sectionLength) {
    return {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    };
  }
};
