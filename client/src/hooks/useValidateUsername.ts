import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { fetchIdServerValidation } from 'services';
import { VALIDATION_RESULT } from 'utils/constants';
import { isValidId, isValidIdLength, isValidIdStr } from 'utils/idValidation';

export function useValidateUsername(setUsername: Dispatch<SetStateAction<string>>, defaultUsername?: string) {
  const [usernameDraft, setUsernameDraft] = useState<string>(defaultUsername ?? '');
  const [validationType, setValidationType] = useState<number>(VALIDATION_RESULT.NULL);

  const handleChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setUsernameDraft(e.currentTarget.value),
    []
  );

  const handleClickValidateButton = () => {
    if (!isValidId(usernameDraft)) return;
    fetchIdServerValidation(usernameDraft)
      .then((res) => {
        if (res.code === 10000) {
          setUsername && setUsername(usernameDraft);
          setValidationType(VALIDATION_RESULT.SUCCESS);
        } else if (res.code === 20001) {
          setValidationType(VALIDATION_RESULT.WRONG_STR);
        } else if (res.code === 20002) {
          setValidationType(VALIDATION_RESULT.DUPLICATED);
        }
      })
      .catch((_) => {
        setValidationType(VALIDATION_RESULT.NULL);
        alert('이미 사용중인 닉네임이거나, 사용 불가능한 닉네임입니다.');
      });
  };

  useEffect(() => {
    setValidationType(VALIDATION_RESULT.NULL);
    if (!isValidIdStr(usernameDraft)) setValidationType(VALIDATION_RESULT.WRONG_STR);
    else if (!isValidIdLength(usernameDraft)) setValidationType(VALIDATION_RESULT.WRONG_LENGTH);
    else setValidationType(VALIDATION_RESULT.NULL);
  }, [usernameDraft]);

  return { handleClickValidateButton, validationType, usernameDraft, handleChangeUsername };
}
