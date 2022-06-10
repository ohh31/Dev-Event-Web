import { useState } from 'react';
import React, { useEffect } from 'react';
import Layout from 'component/layout';
import type { ReactElement } from 'react';
import classNames from 'classnames/bind';
import style from 'styles/myevent.module.scss';
import Link from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import EventBody from 'component/myEvent/EventBody';
import { useRouter } from 'next/router';

const cn = classNames.bind(style);

const EventTab = ({}: any) => {
  const router = useRouter();
  const [tabMenu, setTabMenu] = useState({
    ongoing: false,
    done: false,
  });

  useEffect(() => {
    setTabMenu({
      ongoing: router.query.tab === 'ongoing' || router.query.tab == null,
      done: router.query.tab === 'done',
    });
  }, [router.query.tab]);

  return (
    <div className={cn('tab__header')}>
      <div
        className={cn('tab__header--menu', tabMenu.ongoing === true ? 'selected' : null)}
        onClick={(event) => {
          setTabMenu({ ongoing: true, done: false });
          router.replace('/myevent?tab=ongoing');
        }}
      >
        진행 중인 행사
      </div>

      <div
        className={cn('tab__header--menu', tabMenu.done === true ? 'selected' : null)}
        onClick={(event) => {
          setTabMenu({ ongoing: false, done: true });
          router.replace('/myevent?tab=done');
        }}
      >
        종료된 행사
      </div>
    </div>
  );
};

EventTab.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EventTab;