import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { BsChevronRight,BsChevronLeft } from "react-icons/bs";
import { Box,IconButton,Flex } from "@chakra-ui/react"
import Image from "next/image";
const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
const ar=[1,2,3,4];

  return (
    <>
     <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
      {ar.map((a)=>(
        <div className="keen-slider__slide number-slide1">
            <Box w='100vw' h={'600px'}>
                <Image src={`/c${a}.jpg`} width={1000} height={1000} style={{width:"100%",height:"100%",objectFit:"cover"}} />
            </Box>
          </div>
      ))}
          
           </div>
        {loaded && instanceRef.current && (
          <Flex w={"100vw"} justifyContent={'center'}>
            <IconButton
            // height={'450px'}
            fontSize={'30px'}
              icon={<BsChevronLeft />}
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            
              zIndex="10"
              color={"black"}
              borderRadius="0px"
              colorScheme="orange"
              variant={'unstyled'}
              transitionDuration={"0.5s"}
            _hover={{transform:"scale(1.5)"}}
             />
             

            <IconButton
            
            colorScheme="orange"
            variant={'unstyled'}
            fontSize={'30px'}
            icon={< BsChevronRight />}
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            //   height={'450px'}
              transitionDuration={"0.5s"}
              _hover={{transform:"scale(1.5)"}}
           
              zIndex="10"
              color={"black"}
              borderRadius="0px"
              />
               
          </Flex>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
    </>
  );

}

function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
      <button
        onClick={props.onClick}
      >
        {props.left && (
         left
        )}
        {!props.left && (
          right
        )}
      </button>
    )
  }

export default Carousel;