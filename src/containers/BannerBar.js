import React, { Component } from 'react'
import { Carousel } from 'antd'

const responsiveOption = [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3
    }
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 2
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1
    }
  }
]

class BannerBar extends Component {

  render() {
    const {banners} = this.props
    return (
      <Carousel
        style={{overflow: 'hidden', minWidth: '100%', width: 0}}
        autoplay
        dots={false}
        slidesToShow={4}
        slidesToScroll={1}
        responsive={responsiveOption}
        adaptiveHeight={true}
      >
        {
          banners.map((banner, index) =>
            <a href={banner.url} target='blank' key={index}>
              <img className="gx-pt-2 gx-pb-2" style={{width: '99%', margin: '0 auto'}}
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
