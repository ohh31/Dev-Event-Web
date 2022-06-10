import React from 'react';
import style from 'styles/myevent.module.scss';
import classNames from 'classnames/bind';
import { useMyEvent } from 'lib/hooks/useSWR';
import Item from 'component/common/item/Item';
import { deleteMyEventApi } from 'lib/api/delete';
import { MyEvent } from 'model/event';
import { mutate } from 'swr';

const cn = classNames.bind(style);

const ScheduledEventTab = () => {
  const param = { filter: 'FUTURE' };
  const { myEvent, isLoading, isError } = useMyEvent(param);

  const deleteMyEvent = async ({ favoriteId }: { favoriteId: Number }) => {
    const result = await deleteMyEventApi(`/front/v1/favorite/events/${favoriteId}`, {
      favoriteId: favoriteId,
    });
    mutate([`/front/v1/favorite/events`, param]);
  };

  return (
    <div className={cn('tab__body')}>
      <article className={cn('today-event')}>
        <div className={cn('today-event__list')}>
          {/* {myEvent?.dev_event.map((event: any) => {
            return <div className={cn('wrapper')}>{<Item data={event} isSelected={true} />}</div>;
          })} */}
        </div>
      </article>
      <section className={cn('section')}>
        <div className={cn('section__list')}>
          {!myEvent ? (
            <div>데이터가 없습니다</div>
          ) : (
            myEvent.map((event: MyEvent) => {
              return (
                <div className={cn('wrapper')}>
                  <Item
                    key={event.dev_event.id}
                    data={event.dev_event}
                    isFavorite={false}
                    onClickFavorite={() => {
                      deleteMyEvent({ favoriteId: event.favorite_id });
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default ScheduledEventTab;