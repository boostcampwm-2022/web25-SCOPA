import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { fetchIdServerValidation } from 'services';
import { VALIDATION_RESULT } from 'utils/constants';
import { isValidId, isValidIdLength, isValidIdStr } from 'utils/idValidation';

export function useValidateID(idDraft: string, setId?: Dispatch<SetStateAction<string>>) {
  const [validationType, setValidationType] = useState<number>(VALIDATION_RESULT.NULL);

  const handleClickValidateButton = () => {
    if (isValidId(idDraft)) return;
    fetchIdServerValidation(idDraft)
      .then((res) => {
        if (res.code === 10000) {
          setId && setId(idDraft);
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
    if (!isValidIdStr(idDraft)) setValidationType(VALIDATION_RESULT.WRONG_STR);
    else if (!isValidIdLength(idDraft)) setValidationType(VALIDATION_RESULT.WRONG_LENGTH);
    else setValidationType(VALIDATION_RESULT.NULL);
  }, [idDraft]);

  return { handleClickValidateButton, validationType };
}
