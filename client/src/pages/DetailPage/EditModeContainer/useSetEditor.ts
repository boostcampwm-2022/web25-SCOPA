// 마땅한 이름이 안 떠올라서 이렇게 작명했는데 어떤가요.....
// 프로필 fetch 로직 추가하면 대대적으로 개편해야 할 수도 있음

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { ProfileType } from 'types/profile';

export function useSetEditor(id: string, profileData: ProfileType) {
  const [newProfileData, setNewProfileData] = useState(profileData);
  const [interest, setInterest] = useState(profileData.interest);
  const [skills, setSkills] = useState(profileData.skills);

  const handleChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewProfileData((prevState) => ({ ...prevState, nickname: e.target.value }));
  }, []);

  const handleChangeWorkType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewProfileData((prevState) => ({ ...prevState, worktype: e.target.value }));
  }, []);

  const handleChangeWorkTime = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewProfileData((prevState) => ({ ...prevState, worktime: e.target.value }));
  }, []);

  const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewProfileData((prevState) => ({ ...prevState, email: e.target.value }));
  }, []);

  const handleChangeLanguage = useCallback((newLanguage: string) => {
    setNewProfileData((prevState) => ({ ...prevState, language: newLanguage }));
  }, []);

  const handleChangeRequirements = useCallback((newRequirement01: string, newRequirement02: string) => {
    setNewProfileData((prevState) => ({
      ...prevState,
      requirements: [newRequirement01 ?? prevState.requirements[0], newRequirement02 ?? prevState.requirements[1]],
    }));
  }, []);

  const handleClickSaveProfile = () => {
    console.log(newProfileData);
    // setNewProfileData(newProfileData);
  }; // 변경 여지가 너무 많아 (각각의 상태값이 변할 때마다 함수가 변함) useCallback 사용 X

  const handleClickResetProfile = () => {
    setNewProfileData(profileData);
  };

  useEffect(() => {
    setNewProfileData((prevState) => ({ ...prevState, interest }));
  }, [interest]);

  useEffect(() => {
    setNewProfileData((prevState) => ({ ...prevState, skills }));
  }, [skills]);

  return {
    newProfileData,
    handleChangeNickname,
    // handleChangeCode,
    handleChangeLanguage,
    setInterest,
    setSkills,
    handleChangeRequirements,
    handleChangeWorkTime,
    handleChangeWorkType,
    handleChangeEmail,
    handleClickSaveProfile,
    handleClickResetProfile,
  };
}
