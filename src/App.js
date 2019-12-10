import React from 'react';
import {IoMdPower} from "react-icons/io";
import './App.css';


const data = [{
  
  id: 'tate whitle song',
  keyletter:'Q',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575401467/sounds/tate-whitle-song_wta617.mp3'
}, 
{
 
  id: 'saxophone',
  keyletter:'W',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575401467/sounds/untitled_17_lgmsdn.wav'
}, 
{
  
  id: 'bass drum',
  keyletter:'E',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575401361/sounds/bass-drum_norbdt.mp3'
}, 
{
  
  id: 'snare',
  keyletter: 'A',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575582869/sounds/snare_hyqfj3.mp3'
}, 
{
 
  id: 'clap',
  keyletter:'S',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575401276/sounds/clap_n9vgiu.mp3'
}, 
{
  
  id: '9mm machine gun',
  keyletter:'D',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575401165/sounds/mp5_smg-gunguru-703432894_ommhry.mp3'
}, 
{
  id: "laser thum",
  keyletter:'Z',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575401234/sounds/064-laser-thum_ndyaxu.mp3'
},
 {
  
  id: 'win',
  keyletter:'X',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575402563/sounds/win2_ldzwu2.mp3'
}, 
{
  id: 'nom nom nom',
  keyletter:'C',
  src: 'https://res.cloudinary.com/svalka/video/upload/v1575402563/sounds/nom-nom-nom_rcbhzl.mp3'
},
];

class DrumPad extends React.Component {
  

   componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    window.focus();
  }
  
 componentWillUnmount() {
   document.removeEventListener('keydown', this.handleKeyDown)
 }
  
  handleKeyDown=(e)=>{
    
    if(e.keyCode === this.props.keyletter.charCodeAt()) {
      this.handleClick();
    }
  }
 
  handleClick=()=>{
    if(this.props.getPowerState() === "On"){
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.id, this.audio);
    }
  }

  pause=()=>{
    this.audio.pause();
  }
  

  render() {
    return (
      <div 
          className='drum-pad'
          id={this.props.id}
          onClick={this.handleClick}
      >
        <h1 className={this.props.onClass}>{this.props.keyletter}</h1>
        <audio id={this.props.keyletter}
               className='clip'
               keyCode={this.props.keyCode}
               src={this.props.src}
               ref={ref => this.audio = ref}
          ></audio>
      </div>
    )
  }
}


function stylePower(id, color) {
  var elem = document.getElementById(id);
  elem.style["background"] = color; 
}

function powerOnOff(id, color) {
  var elem = document.getElementById(id);
  elem.style["color"] = color; 
} 
function volumeTextChange(id, text) {
  var elem = document.getElementById(id); 
  elem.text = text;
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: 'Welcome, to get started, just press the keys on your keybord',
      power: "On",
      volume: 100,
      volumeText: "Volume: 100%", 
      isActive: true,
      onClass: 'active'
    }
  }
  
  currentAudio = {}

  handleDisplay =(display, audio) => {
      this.setState({ display });
      this.currentAudio[display] = audio;
    };
  handleDisplayPower =(power) => this.setState({ power });
  getPowerState = () => { return this.state.power;};
  getVolumeState = () => { return this.state.volume;};

  handleClickBtn(){
    let temp=this.state.power;
      
    if(temp==="On"){
      this.state.power="Off";
      this.state.display='';
      this.state.isActive=false;
      stylePower("power_btn","#B31E00");
      powerOnOff("power","#B31E00");
      

      for(var key in this.currentAudio) {
        var audio = this.currentAudio[key];
        audio.pause();
      }
    }
    else{
      this.state.power="On";
      this.state.display="Welcome, to get started, just press the keys on your keybord";
      stylePower("power_btn","#91bf96");
      powerOnOff("power","#91bf96");
      this.state.isActive=true;
    }
    
    this.state.onClass= this.state.isActive? 'active': 'passive';

    this.handleDisplayPower(this.state.power);
  }
  handleVolume = (e) => {
    let temp=this.state.power;
      
    if(temp==="On"){
  
    this.setState({
      volume:e.target.value,
      volumeText: 'Volume: '+e.target.value + " %"
    })
    volumeTextChange('lable_volume',this.state.volumeText);

    for(var key in this.currentAudio) {
      var audio = this.currentAudio[key];
      audio.volume=e.target.value/100;
     
    }
  }
   
  }
 
  render(){
    return(
    <div id='drum-machine'>
        <div id='display'>{this.state.display}</div>
        
        <div id={'drum-pads'}  >
        <div id='settings'>
       

        <div className="power" id="power">
            {this.state.power}
            <button id="power_btn" style={this.state.powerStyle} className="power_btn" onClick={this.handleClickBtn.bind(this)}> <IoMdPower /> </button>
        </div>

        <div className="volume passive">
           <label id="lable_volume">{this.state.volumeText}</label>
           <input id="input_volume" type="range" min="0" max="100" step="10" defaultValue="100" value={this.state.volume} onChange={this.handleVolume} />
        </div>

        </div>
       
        {data.map(d => (
           
          <DrumPad 
          key={d.id}
          id={d.id}
          onClass={this.state.onClass}
          active={d.active}
          keyletter={d.keyletter}
          src={d.src}
          handleDisplay={this.handleDisplay}
          getPowerState={this.getPowerState}
          getVolumeState={this.getVolumeState}
        />
        
         ))} 
      
         </div>
    </div>
    )
  }
}

  export default App;