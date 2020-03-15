import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Ticket from './Ticket';

class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      // tickets: ['sz002030','sz002024'],
      tickets: [],
      code: ''
    }
    this.close = this.close.bind(this);
  }

  addTicket(e){
    e.preventDefault();
    const {tickets, code} = this.state;
    if(!code)return;
    if(tickets.includes(code))return;
    if(!/^(sz|sh)\d{6}$/.test(code))return;
    this.setState({tickets: [...tickets, code], code:''});
  }

  stockChanged(e){
    this.setState({code: e.target.value});
  }

  close(code){
    const {tickets} = this.state;
    tickets.splice(tickets.indexOf(code), 1);
    this.setState({tickets: [...tickets]});
  }

  render(){
    const {code, tickets} = this.state;
    const ticketPanels = tickets.map(stockCode=><li key={stockCode}><Ticket code={stockCode} close={this.close}/></li>);
    return(
      <div>
        <form onSubmit={this.addTicket.bind(this)} id="ticketForm">
          <input type="text" onChange={this.stockChanged.bind(this)} value={code} placeholder="sz/sh000000"/>
          <input type="submit" value="新看板"/>
        </form>

        <ul>
          {ticketPanels}
        </ul>
      </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
