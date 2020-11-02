import React from "react";
import CursorIcon from "../../assets/cursor";
import NotificationIcon from "../../assets/notification";
import PreferencesIcon from "../../assets/preferences";
import ParkingLotIcon from "../../assets/parkingmeter";
import PasswordIcon from "../../assets/password";
import LogoutIcon from "../../assets/log-out";
import DeleteAccountIcon from "../../assets/delete-account";
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
      to: "TemporaryScreen",
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
      to: "TemporaryScreen",
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
      value: "parkingLot",
      svg: <ParkingLotIcon />,
      backgroundColor: colors.profileSection2,
      to: "ParkingLotScreen",
    },
  ],
  [
    {
      id: 6,
      value: "faq",
      icon: "help",
      iconType: "MaterialCommunityIcons",
      backgroundColor: colors.profileSection3,
      to: "TemporaryScreen",
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
      to: "TemporaryScreen",
    },
  ],
  [
    {
      id: 9,
      value: "resetPassword",
      svg: <PasswordIcon />,
      backgroundColor: colors.profileSection4,
      to: "TemporaryScreen",
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
      to: "TemporaryScreen",
    },
    {
      id: 3,
      value: "notification",
      svg: <NotificationIcon />,
      backgroundColor: colors.profileSection1,
      to: "TemporaryScreen",
    },
  ],
  [
    {
      id: 6,
      value: "faq",
      icon: "help",
      iconType: "MaterialCommunityIcons",
      backgroundColor: colors.profileSection3,
      to: "TemporaryScreen",
    },
    {
      id: 7,
      value: "contactUs",
      icon: "mail",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "TemporaryScreen",
    },
    {
      id: 8,
      value: "legal",
      icon: "file-text",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "TemporaryScreen",
    },
    {
      id: 8,
      value: "helpGuide",
      icon: "life-buoy",
      iconType: "Feather",
      backgroundColor: colors.profileSection3,
      to: "TemporaryScreen",
    },
  ],
  [
    {
      id: 9,
      value: "resetPassword",
      svg: <PasswordIcon />,
      backgroundColor: colors.profileSection4,
      to: "TemporaryScreen",
    },
    {
      id: 10,
      value: "logout",
      svg: <LogoutIcon />,
      backgroundColor: colors.profileSection4,
    },
  ],
]

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
