import React, { useContext } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  return (
    <div className="col">
      <div className="card rounded-2xl">
        <div
          style={{
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="corner-2xl flex flex-col h-56"
        />

        <div className="card-body">
          <p className="text-xl font-bold">{props.item.title}</p>
          <div className="d-flex jsutify-content-between align-item-center text-sm">
            <h5>
              {days * 24 + hours} hr {minutes} min {seconds} sec
            </h5>
          </div>
          <p className="text-sm">{props.item.desc}</p>
          <div className="d-flex justify-content-between align-item-center ">
            <div>
              {!props.owner ? (
                <div
                  onClick={() => props.bidAuction()}
                  className="btn btn-outline-secondary"
                >
                  Bid
                </div>
              ) : props.owner.email === props.item.email ? (
                <div
                  onClick={() => props.endAuction(props.item.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancel Auction
                </div>
              ) : props.owner.email === props.item.curWinner ? (
                <p className="text-xl">Winner</p>
              ) : (
                <div
                  onClick={() =>
                    props.bidAuction(props.item.id, props.item.curPrice)
                  }
                  className="btn btn-outline-secondary"
                >
                  Bid
                </div>
              )}
            </div>
            <p className="text-2xl">{props.item.curPrice}zł</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};
