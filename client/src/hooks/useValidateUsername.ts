import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { fetchIdServerValidation } from 'services';
import { VALIDATION_RESULT } from 'utils/constants';
import { isValidId, isValidIdLength, isValidIdStr } from 'utils/idValidation';

export function useValidateUsername(usernameDraft: string, setUsername?: Dispatch<SetStateAction<string>>) {
  const [validationType, setValidationType] = useState<number>(VALIDATION_RESULT.NULL);

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
      .catch((err) => {
        setValidationType(VALIDATION_RESULT.NULL);
        alert(err);
      });
  };

  useEffect(() => {
    setValidationType(VALIDATION_RESULT.NULL);
    if (!isValidIdStr(usernameDraft)) setValidationType(VALIDATION_RESULT.WRONG_STR);
    else if (!isValidIdLength(usernameDraft)) setValidationType(VALIDATION_RESULT.WRONG_LENGTH);
    else setValidationType(VALIDATION_RESULT.NULL);
  }, [usernameDraft]);

  return { handleClickValidateButton, validationType };
}
