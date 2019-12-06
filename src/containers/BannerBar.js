import React, { Component } from 'react'
import { Carousel } from 'antd'
import { BANNERS } from '../constants/AppConfigs'

const responsiveOption = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]

class BannerBar extends Component {

  render() {
    return (
      <Carousel className="gx-bg-geekblue" autoplay slidesToShow={4} slidesToScroll={4} responsive={responsiveOption}>
        {
          BANNERS.map((banner, index) =>
            <a href={banner.url} target='blank'>
              <img className="gx-pt-2 gx-pb-2" style={{width: '96%', margin: '0 auto'}}
                   src={require(`assets/images/banners/${banner.img}`)}
                   alt="banner"/>
            </a>
          )
        }
      </Carousel>
    )
  }
}

export default BannerBar
