import React from 'react';
import Layout from 'component/common/layout';
import type { ReactElement } from 'react';
import classNames from 'classnames/bind';
import style from 'styles/Home.module.scss';
import { useRouter } from 'next/router';
import { useMonthlyEvent } from 'lib/hooks/useSWR';
import { MdClose } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';
import List from 'component/common/list/list';
import EventFilters from './EventFilters';

const cn = classNames.bind(style);

const MonthlyEventList = () => {
  const router = useRouter();

  const param = { year: Number(router.query.year), month: Number(router.query.month) };

  const { monthlyEvent, isError } = useMonthlyEvent({
    param: param,
  });

  if (isError) {
    return <div className={cn('null-container')}>이벤트 정보를 불러오는데 문제가 발생했습니다!</div>;
  }

  return (
    <>
      <div className={cn('section__header')}>
        <span className={cn('section__header__desc')}>
          <span>검색결과</span>
        </span>
        <div className={cn('section__header__filters')}>
          <EventFilters />
        </div>
      </div>
      <div className={cn('section__list')}>
        <div className={cn('section__list__title')}>
          <span>{`${router.query.year}년 ${router.query.month}월`}</span>
          <div
            className={cn('reset-button')}
            onClick={(event) => {
              router.replace(`/events`);
            }}
          >
            <MdClose size={20} color="#676767" />
          </div>
        </div>
        {monthlyEvent && !isError ? (
          monthlyEvent.length !== 0 ? (
            <List data={monthlyEvent} />
          ) : (
            <div className={cn('null-container')}>아직 조건에 맞는 개발자 행사가 없어요 📂</div>
          )
        ) : (
          <div className={cn('null-container')}>
            <ThreeDots color="#479EF1" height={60} width={60} />
          </div>
        )}
      </div>
    </>
  );
};

MonthlyEventList.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default MonthlyEventList;
