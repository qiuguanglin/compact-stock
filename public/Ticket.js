import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Config from '../Config';
import './index.css';

class Ticket extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      title: null,
      openingPrice: 0,
      closedPrice: 0,
      price: 0,
      highest: 0,
      lowest: 0,
      bidBuyPrice: 0,
      bidSellPrice: 0,
      bidQuan: 0,
      bidPrice: 0,
      buyOneQuan: 0,
      buyOne: 0,
      buyTwoQuan: 0,
      buyTwo: 0,
      buyThreeQuan: 0,
      buyThree: 0,
      buyFourQuan: 0,
      buyFour: 0,
      buyFiveQuan: 0,
      buyFive: 0,
      sellOneQuan: 0,
      sellOne: 0,
      sellTwoQuan: 0,
      sellTwo: 0,
      sellThreeQuan: 0,
      sellThree: 0,
      sellFourQuan: 0,
      sellFour: 0,
      sellFiveQuan: 0,
      sellFive: 0,
      tradeDate: null,
      tradeTime: null
    }
  }

  close(code){
    this.props.close(code);
  }

  top(code){
    this.props.top(code);
  }

  extract(bundle){
    const {code} = this.props;
    const stats = (new Function(`${bundle}  return hq_str_${code}`))().split(/,/);

    const keys = Object.keys(this.state);
    const obj = {};
    for(let i=0; i<stats.length; i++){
      const stat = stats[i];
      const key = keys[i];
      if(!key)continue;
      stat = (key == 'title' || key.includes('Quan')) ? stat : (+stat).toFixed(2);
      obj[key] = stat;
    }
    this.setState(obj);
  }

  componentDidMount(){
    // this.extract('var hq_str_sz002030="达安基因,16.300,17.140,18.000,18.480,16.180,17.990,18.000,124653595,2181583385.100,9000,17.990,42700,17.980,1300,17.970,8600,17.960,9900,17.950,242715,18.000,18600,18.010,38900,18.020,18200,18.030,5100,18.040,2020-03-13,15:00:03,00";var hq_str_sz002024="苏宁易购,9.000,9.330,9.150,9.230,8.900,9.140,9.150,79873115,723348802.360,605350,9.140,348400,9.130,458300,9.120,155000,9.110,468500,9.100,159077,9.150,109200,9.160,56000,9.170,96000,9.180,98308,9.190,2020-03-13,15:00:03,00";var hq_str_sz002030="达安基因,16.300,17.140,18.000,18.480,16.180,17.990,18.000,124653595,2181583385.100,9000,17.990,42700,17.980,1300,17.970,8600,17.960,9900,17.950,242715,18.000,18600,18.010,38900,18.020,18200,18.030,5100,18.040,2020-03-13,15:00:03,00";var hq_str_sz002024="苏宁易购,9.000,9.330,9.150,9.230,8.900,9.140,9.150,79873115,723348802.360,605350,9.140,348400,9.130,458300,9.120,155000,9.110,468500,9.100,159077,9.150,109200,9.160,56000,9.170,96000,9.180,98308,9.190,2020-03-13,15:00:03,00";var hq_str_sz002030="达安基因,16.300,17.140,18.000,18.480,16.180,17.990,18.000,124653595,2181583385.100,9000,17.990,42700,17.980,1300,17.970,8600,17.960,9900,17.950,242715,18.000,18600,18.010,38900,18.020,18200,18.030,5100,18.040,2020-03-13,15:00:03,00";var hq_str_sz002024="苏宁易购,9.000,9.330,9.150,9.230,8.900,9.140,9.150,79873115,723348802.360,605350,9.140,348400,9.130,458300,9.120,155000,9.110,468500,9.100,159077,9.150,109200,9.160,56000,9.170,96000,9.180,98308,9.190,2020-03-13,15:00:03,00";var hq_str_sz002030="达安基因,16.300,17.140,18.000,18.480,16.180,17.990,18.000,124653595,2181583385.100,9000,17.990,42700,17.980,1300,17.970,8600,17.960,9900,17.950,242715,18.000,18600,18.010,38900,18.020,18200,18.030,5100,18.040,2020-03-13,15:00:03,00";var hq_str_sz002024="苏宁易购,9.000,9.330,9.150,9.230,8.900,9.140,9.150,79873115,723348802.360,605350,9.140,348400,9.130,458300,9.120,155000,9.110,468500,9.100,159077,9.150,109200,9.160,56000,9.170,96000,9.180,98308,9.190,2020-03-13,15:00:03,00";');
    const {code} = this.props;
    const stockRest = Config.stockRest();

    this.clock = setInterval(()=>{
      axios({
        url: stockRest,
        params: {
          code
        },
        validateStatus: function(status){
          return status == 200;
        }
      }).then(msg=>{
        this.extract(msg.data);
      }).catch(err=>clearInterval(this.clock));
    }, Config.retrieveInterval());
  }

  componentWillUnmount(){
    if(this.clock)clearInterval(this.clock);
  }

  render(){
    const {code} = this.props;
    const {title, openingPrice, closedPrice, price, highest, lowest, bidBuyPrice, bidSellPrice, bidQuan, bidPrice,
       buyOneQuan, buyOne, buyTwoQuan, buyTwo, buyThreeQuan, buyThree, buyFourQuan, buyFour, buyFiveQuan, buyFive,
       sellOneQuan, sellOne, sellTwoQuan, sellTwo, sellThreeQuan, sellThree, sellFourQuan, sellFour, sellFiveQuan, sellFive,
       tradeDate} = this.state;

    const percentage = Math.round(((price-closedPrice)/closedPrice) * 10000)/100 + '%';
    const gap = price-closedPrice;
    const priceStyle = {color: gap > 0 ? 'red' : gap == 0 ? 'gray' : 'green'};
    const stockLink = Config.financeLink(code);

    return(
      <div className="ticket">
        <div className="header">
          <label onClick={this.close.bind(this, code)}>X</label>
          <label className="topBtn" onClick={this.top.bind(this, code)}>TOP</label>
          <h1>
            <span className="code">{code}</span>
            <span className="title"><a href={stockLink}>{title}</a></span>
          </h1>
        </div>
        <div>
          <table border="1">
            <tbody>
              <tr className="caption">
                <td colSpan="2">
                  当前价
                  <span style={priceStyle}>
                    {price}, {percentage}
                  </span>
                </td>
              </tr>
              <tr className="caption"><td>最高</td><td>最低</td></tr>
              <tr><td>{highest}</td><td>{lowest}</td></tr>
              <tr className="caption"><td>昨收</td><td>今开</td></tr>
              <tr><td>{closedPrice}</td><td>{openingPrice}</td></tr>
              <tr className="direction-b caption"><td colSpan="2">买</td></tr>
              <tr className="caption"><td>价钱</td><td>数量</td></tr>
              <tr><td>{buyFive}</td><td>{buyFiveQuan}</td></tr>
              <tr><td>{buyFour}</td><td>{buyFourQuan}</td></tr>
              <tr><td>{buyThree}</td><td>{buyThreeQuan}</td></tr>
              <tr><td>{buyTwo}</td><td>{buyTwoQuan}</td></tr>
              <tr className="d-border"><td>{buyOne}</td><td>{buyOneQuan}</td></tr>
              <tr className="d-border"><td>{sellOne}</td><td>{sellOneQuan}</td></tr>
              <tr><td>{sellTwo}</td><td>{sellTwoQuan}</td></tr>
              <tr><td>{sellThree}</td><td>{sellThreeQuan}</td></tr>
              <tr><td>{sellFour}</td><td>{sellFourQuan}</td></tr>
              <tr><td>{sellFive}</td><td>{sellFiveQuan}</td></tr>
              <tr className="direction-s caption"><td colSpan="2">卖</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Ticket;
