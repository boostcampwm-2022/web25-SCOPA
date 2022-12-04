import { useRef, useState } from 'react';

import { ProfileType } from 'types/profile';

export function useSetProfileEditor(id: string, profileData: ProfileType) {
  const [interest, setInterest] = useState(profileData.interest);
  const [techStack, setTechStack] = useState(profileData.techStack);
  const [language, setLanguage] = useState(profileData.language);
  const [code, setCode] = useState(profileData.code);
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
      code,
      language,
      interest,
      techStack,
      requirements: [requirementRef1.current?.value ?? '', requirementRef2.current?.value ?? ''],
      worktype: workTypeRef.current?.value ?? '',
      worktime: workTimeRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      liked: profileData.liked,
    };
    // eslint-disable-next-line no-console
    console.log(newData);
    // setNewProfileData(newProfileData);
  };
  // 의존성을 갖는 변수가 너무 많아 (각각의 상태값이 변할 때마다 함수가 변함) useCallback 사용 X

  return {
    workTypeRef,
    workTimeRef,
    nicknameRef,
    emailRef,
    requirementRef1,
    requirementRef2,
    code,
    setCode,
    interest,
    setInterest,
    techStack,
    setTechStack,
    language,
    setLanguage,
    handleClickSaveProfile,
  };
}
