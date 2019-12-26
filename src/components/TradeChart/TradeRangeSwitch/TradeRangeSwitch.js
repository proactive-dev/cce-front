import React from 'react';
import classNames from 'classnames';

import './TradeRangeSwitch.css';

class TradeRangeSwitch extends React.Component {
  state = {
    unit: 60,
  };

  onChangeUnit = unit => {
    this.setState({ unit });
    this.props.setRange(unit);
  }

  render() {
    const { unit } = this.state;
    return (
      <ul className="list-inline switch" data-x="60" id="range_switch">
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 1})} data-x="1" href="#" onClick={() => this.onChangeUnit(1)}>1m</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 5})} href="#" onClick={() => this.onChangeUnit(5)}>5m</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 15})} data-x="15" href="#" onClick={() => this.onChangeUnit(15)}>15m</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 30})} data-x="30" href="#" onClick={() => this.onChangeUnit(30)}>30m</div>
        </li>
        <li className="text-center">
          <span>|</span>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 60})} data-x="60" href="#" onClick={() => this.onChangeUnit(60)}>1h</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 120})} data-x="120" href="#" onClick={() => this.onChangeUnit(120)}>2h</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 240})} data-x="240" href="#" onClick={() => this.onChangeUnit(240)}>4h</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 360})} href="#" onClick={() => this.onChangeUnit(360)}>6h</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 720})} data-x="720" href="#" onClick={() => this.onChangeUnit(720)}>12h</div>
        </li>
        <li className="text-center">
          <span>|</span>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 1440})} data-x="1440" href="#" onClick={() => this.onChangeUnit(1440)}>1d</div>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 4320})} data-x="4320" href="#" onClick={() => this.onChangeUnit(4320)}>3d</div>
        </li>
        <li className="text-center">
          <span>|</span>
        </li>
        <li className="text-center">
          <div className={classNames("hand-point", "chart-switch", {"active": unit === 10080})} data-x="10080" href="#" onClick={() => this.onChangeUnit(10080)}>1w</div>
        </li>
      </ul>
    )
  }
}

export default TradeRangeSwitch;