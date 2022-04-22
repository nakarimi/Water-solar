import React from 'react';
// import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import Projects from './Projects';
import ContactCard from 'components/Cards/Contact/index';
import MapWithASearchBox from "../../../map/routes/MapWithSearchBox/Components/MapWithASearchBox";
import CardBox from 'components/CardBox';
import TestimonialCarousel from './testimonial/index';
import PumpList from "./PumpList";
import SolarList from "./SolarList";
import InvertorList from "./InvertorList";
//backdrop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { withStyles } from "@material-ui/styles";
//country flag
import Flags from 'country-flag-icons/react/3x2';
import Slider from "react-slick";

function getFlag(countryname) {
  switch (countryname) {
    case 'Afghanistan':
      return <Flags.AF title="United States" className="customflag"/> ;
    case 'Italy':
      return <Flags.IT title="United States" className="customflag"/> ;
    case 'China':
      return <Flags.CH title="United States" className="customflag" />;
     case 'Iran':
     return <Flags.IR title="United States" className="customflag"/> ;
    default:
      return '';
  }
}

const testimonials = [
  {
    content: 'All the Lorem Ipsum generators on the Internet tend to repeat, making this the first true generator on the Internet.',
    avatar: '/images/General layout.png',
    name: 'Alex Dolgove',
    title: 'BDM G-axon'
  }, {
    content: 'Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
    avatar: '/images/System layout.png',
    name: 'Domnic Brown',
    title: 'Product Head'
  }, {
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
    avatar: '/images/Pipe layout.png',
    name: 'Jeson Born',
    title: 'Director, Abc LLC'
  }, {
    content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, ',
    avatar: '/images/Motor Cable layout.png',
    name: 'John Smith',
    title: 'Chief Engineer'
  }, {
    content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form',
    avatar: '/images/outlet layout.png',
    name: 'Min Chan',
    title: 'Director, Abc LLC'
  }, {
    content: 'It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures',
    avatar: '/images/Hight layout.png',
    name: 'Stella Johnson',
    title: 'Engineer Lead'
  }, {
    content: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections ',
    avatar: '/images/System details layout.png',
    name: 'Steve Smith',
    title: 'Director, Abc LLC'
  }
]; 

const styles = theme => ({
  backdrop: {
   zIndex: theme.zIndex.drawer + 1,
   color: '#fff',
 },
});

class Intranet extends React.Component {
  constructor() {
    super();
    this.state= {
      solarBrands: [],
      pumpBrands: [],
      invertorBrand: [],
      projects: [],
      pumpLists: [],
      solarLists: [],
      invertorLists: [],
      openbackdrop: false,
      options: {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 2,
        marginRight: 10,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1050,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              dots: false
            }
          }, 
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: false
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      },
    }
    this.getUserDashboardData();

  }
  getUserDashboardData(){
    this.setState({openbackdrop: true});
    axios.get('api/adminDashboard')
      .then(res => {  
        this.setState({
          openbackdrop: false, solarBrands: res.data.solarbrand, pumpBrands: res.data.pumpbrand, invertorBrand: res.data.invertorBrand, pumpLists: res.data.pumpLists, solarLists: res.data.solarLists, invertorLists: res.data.invertorLists, projects:res.data.projects 
        });
       //  console.log('solarBrands and pumpbrand', res);
      }
        
    ).catch(err => {
      this.setState({openbackdrop: false});
          NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
          id="notification.titleHere"/>);
        }
      )
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="sidebar.dashboard.user"/>}/> */}
        <Backdrop className={classes.backdrop} open={this.state.openbackdrop} >
          <CircularProgress color="inherit" />
        </Backdrop>
          <div className="row ">
            <CardBox styleName="col-xl-7 col-lg-7 col-md-12 col-12 dashboard-slide" cardStyle="text-center"
                    heading>
              <TestimonialCarousel testimonials={testimonials}/>
            </CardBox>
            <div className="col-xl-5 col-lg-5 col-md-12 col-12 dashboard-project">
                <Projects projects={this.state.projects}/>
            </div>
          
            <CardBox styleName="col-xl-5 col-lg-5 col-md-12 col-12 dashboard-brand" cardStyle="text-center"
                    heading={<IntlMessages id="Water Pump Brands"/>}>
              <Slider className="slick-app-frame" {...this.state.options} >
                {this.state.pumpBrands.map((data,index) => {
                  return <div class="slick-slide-item">
                    <div className="brand-logo">
                      <div className="brand-logo-inner">
                        <img src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`} alt="Clients"/>
                      </div>
                      
                    </div>
                    <span> {data.country} {getFlag(data.country)}  </span>
                  </div>  
                })} 
              </Slider>
            </CardBox>
            <div className="col-xl-7 col-lg-7 col-md-12 col-12 dashborad-brand-list">
              <PumpList pumpLists={this.state.pumpLists}/>
            </div>

            <CardBox styleName="col-xl-5 col-lg-5 col-md-12 col-12 dashboard-brand" cardStyle="text-center"
                      heading={<IntlMessages id="Solar Brands"/>}>
                <Slider className="slick-app-frame" {...this.state.options} >
                  {this.state.solarBrands.map((data,index) => {
                    return <div class="slick-slide-item">
                      <div className="brand-logo">
                        <div className="brand-logo-inner">
                          <img src={`${axios.defaults.baseURL}brand/solar/${data.image}`} alt="Clients"/>
                        </div>
                      </div>
                      <span> {data.country} {getFlag(data.country)}  </span>
                    </div>  
                  })} 
                </Slider>
              </CardBox>
              <div className="col-xl-7 col-lg-7 col-md-12 col-12 dashborad-brand-list">
                <SolarList solarLists={this.state.solarLists} />
              </div>

              <CardBox styleName="col-xl-5 col-lg-5 col-md-12 col-12 dashboard-brand" cardStyle="text-center"
                        heading={<IntlMessages id="Invertor Brands"/>}>
                  <Slider className="slick-app-frame" {...this.state.options} >
                    {this.state.invertorBrand.map((data,index) => {
                      return <div class="slick-slide-item">
                        <div className="brand-logo">
                          <div className="brand-logo-inner">
                            <img src={`${axios.defaults.baseURL}brand/invertor/${data.image}`} alt="Clients"/>
                          </div>
                        </div>
                        <span> {data.country} {getFlag(data.country)}  </span>
                      </div>  
                    })} 
                  </Slider>
                </CardBox>
                <div className="col-xl-7 col-lg-7 col-md-12 col-12 dashborad-brand-list">
                  <InvertorList invertorLists={this.state.invertorLists} />
                </div>

                <div className="col-lg-4 col-md-5 col-sm-6 col-12">
                  <ContactCard/>
                </div>

                <div className="col-lg-8 col-12">
                  <div className="jr-card p-2">
                    <MapWithASearchBox styleName="embed-responsive-31by9"/>
                  </div>
                </div> 
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Intranet);