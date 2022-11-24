// 마땅한 이름이 안 떠올라서 이렇게 작명했는데 어떤가요.....
// 프로필 fetch 로직 추가하면 대대적으로 개편해야 할 수도 있음

import { useRef, useState } from 'react';

import { ProfileType } from 'types/profile';

export function useSetEditor(id: string, profileData: ProfileType) {
  const [interest, setInterest] = useState(profileData.interest);
  const [skills, setSkills] = useState(profileData.skills);
  const [language, setLanguage] = useState(profileData.language);
  const workTypeRef = useRef<HTMLInputElement>(null);
  const workTimeRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const requirementRef1 = useRef<HTMLInputElement>(null);
  const requirementRef2 = useRef<HTMLInputElement>(null);

  const handleClickSaveProfile = () => {
    const newData = {
      id,
      nickname: nicknameRef.current?.value ?? '', // 검증 로직 필요
      code: profileData.code, // CODE Editor 추가하면 수정
      language,
      interest,
      skills,
      requirements: [requirementRef1.current?.value ?? '', requirementRef2.current?.value ?? ''],
      worktype: workTypeRef.current?.value ?? '',
      worktime: workTimeRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      liked: profileData.liked,
    };
    console.log(newData);
    // setNewProfileData(newProfileData);
  }; // 변경 여지가 너무 많아 (각각의 상태값이 변할 때마다 함수가 변함) useCallback 사용 X

  return {
    // handleChangeCode,
    workTypeRef,
    workTimeRef,
    nicknameRef,
    emailRef,
    requirementRef1,
    requirementRef2,
    interest,
    setInterest,
    skills,
    setSkills,
    setLanguage,
    handleClickSaveProfile,
  };
}
