import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SingleProfileType } from 'types/profile';
import { LINK } from 'utils/constants';
import { fetchFilteredData } from './fetchFilteredData';

export function useSetMainPageData() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [interest, setInterest] = useState<string>('');
  const [techStack, setTechStack] = useState<Array<string>>([]);
  const [likedFilter, setLikedFilter] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Array<SingleProfileType>>([]);
  const [totalNumOfData, setTotalNumOfData] = useState<number>(6);
  const [params] = useSearchParams();
  const nav = useNavigate();

  const handleChangeLike = useCallback(() => {
    setLikedFilter((prevState) => !prevState);
  }, []);

  async function getFilteredData(paramObject: URLSearchParams) {
    await fetchFilteredData(paramObject).then((data) => {
      setProfileData(data?.list ?? []);
      setTotalNumOfData(data?.totalNumOfData ?? 0);
    });
  }

  function handleClickSearchButton() {
    const paramObject: Record<string, string> = {};

    if (interest.length > 0) paramObject.interest = interest;
    if (techStack.length > 0) {
      techStack.forEach((skill, i) => {
        paramObject[`skill${i + 1}`] = skill;
      });
    }
    if (likedFilter) paramObject.liked = 'true';
    paramObject.page = '1';
    nav(`${LINK.MAIN}?${new URLSearchParams(paramObject)}`);
  }

  function handleChangePageNumber(page: number) {
    params.set('page', page.toString());
    nav(`${LINK.MAIN}?${params}`);
  }

  useEffect(() => {
    const queryValues: Record<string, number | string | string[] | boolean> = {
      page: params.has('page') ? parseInt(params.get('page') ?? '1', 10) : 1,
      interest: params.has('interest') ? params.get('interest') ?? '' : '',
      techStack: ['1', '2', '3'].reduce((acc: string[], cur) => {
        const param = params.get(`skill${cur}`);
        if (param) return [...acc, param];
        return acc;
      }, []),
      liked: params.has('liked'),
    };
    setCurrentPage(queryValues.page as number);
    setInterest(queryValues.interest as string);
    setTechStack(queryValues.techStack as string[]);
    setLikedFilter(queryValues.liked as boolean);
    getFilteredData(params);
  }, [params]);

  return {
    interest,
    setInterest,
    techStack,
    setTechStack,
    likedFilter,
    currentPage,
    totalNumOfData,
    profileData,
    handleClickSearchButton,
    handleChangePageNumber,
    handleChangeLike,
  };
}
