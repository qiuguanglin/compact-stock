import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Ticket from './Ticket';

class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      // tickets: ['sz002030','sz002024','sz002030','sz002024','sz002030','sz002024','sz002030','sz002024'],
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

  componentDidMount(){
    window.addEventListener('beforeunload', e=>localStorage.setItem('portfolios', this.state.tickets.join(',')));
    if(Storage){
      const portfolios = localStorage.getItem('portfolios');
      if(portfolios){
        portfolios.split(',');
        this.setState({tickets: portfolios.split(',')});
      }
    }
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload');
  }

  render(){
    const {code, tickets} = this.state;
    const ticketPanels = tickets.map(stockCode=><Ticket key={stockCode} code={stockCode} close={this.close}/>);
    return(
      <div>
        <form onSubmit={this.addTicket.bind(this)} id="ticketForm">
          <input type="text" onChange={this.stockChanged.bind(this)} value={code} placeholder="sz/sh000000"/>
        </form>

        <div id="ticketList" style={{width: tickets.length * 260}}>
          {ticketPanels}
        </div>
      </div>);
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
