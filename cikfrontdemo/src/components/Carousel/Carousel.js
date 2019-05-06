import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

import { bounce, pulse, fadeInUp, rubberBand, rotateIn, fadeIn } from 'react-animations';
import banner1 from '../../images/banners/4.jpg';
import banner2 from '../../images/banners/1.jpg';
import banner3 from '../../images/banners/2.jpg';
import banner4 from '../../images/banners/3.jpg';
import rocket from '../../images/icons/rocket.png';
import * as actions from '../../actions';

//const styleIn = "position: absolute;right: 15%;bottom: 41%;left: 40%;z-index: 10;padding-top: 20px;padding-bottom: 20px";

const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`}`;
const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;
//const FadeInUp = styled.div`animation: 2s ${keyframes`${styleIn}`}`;
const RubberBand = styled.div`animation: 2s ${keyframes`${rubberBand}`}`;
const RotateIn = styled.div`animation: 2s ${keyframes`${rotateIn}`} `;

const items = [
    {
        src: banner1,
        altText: 'Slide 1',
        caption: 'Slide 1',
        animation: Pulse
    },
    {
        src: banner2,
        altText: 'Slide 2',
        caption: 'Slide 2',
        animation: RotateIn
    },
    {
        src: banner3,
        altText: 'Slide 3',
        caption: 'Slide 3',
        animation: RubberBand
    },
    {
        src: banner4,
        altText: 'Slide 4',
        caption: 'Slide 4',
        animation: Bounce,
        component: rocket
    }
];

class ControlledCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {

        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            let TagName = item.animation;
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <TagName>
                        <img style={{ width: 100 + '%' }} src={item.src} alt={item.altText} />
                    </TagName>
                    {
                        item.component ?
                            <RotateIn>
                                <img style={{}} src={item.component} alt={item.altText} />
                            </RotateIn> : ""
                    }
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default connect(
    state => state,
    actions
)(ControlledCarousel);
