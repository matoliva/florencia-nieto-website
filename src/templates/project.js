import React, { useState } from "react"
import Layout from '../components/Layout'
import styled from "styled-components"
import { graphql } from "gatsby"
import DinamicGrid from "../components/DinamicGrid"
import NextIcon from '../icons/angle-right-solid.svg'
import PrevIcon from '../icons/angle-left-solid.svg'

const ProjectTitle = styled.h1`
  color: ${({ theme }) => theme.colors.font};
  font-weight: 100;
`
const PageWrapper = styled.section`
  display: flex;
  width: 70vw;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

const ProjectDescription = styled.article`
  color: ${({ theme }) => theme.colors.font};
  font-size: 18px;
  font-weight: 200;
  line-height: 2;
  margin: 40px 0;
  border-bottom: 1px solid #444;
  font-style: italic;
`

const Template = ({ title, description, images }) => {
  const [isGalleryOpen, setGalleryOpen] = useState(false)
  const [currentImg, setCurrentImg] = useState(0)

  const handleGalleryOpen = (currentImg = 0) => {
    setGalleryOpen(true)
    setCurrentImg(currentImg)
  }

  return (
    <>
      {isGalleryOpen ? <ImageGallery images={images} currentImg={currentImg} closeGallery={() => setGalleryOpen(false)}/> : null}
      <PageWrapper>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>
          {description}
        </ProjectDescription>
        <DinamicGrid items={images.map(img => ({img}))} onClick={handleGalleryOpen}/>
      </PageWrapper>
    </>
  )
}


const GalleryWrapper = styled.section`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(0,0,0,0.9);
`
const ImageGallery = ({ images, closeGallery, current = 0 }) => {
  const [currentImg, setCurrentImg] = useState(current)
  React.useEffect(() => setCurrentImg(current), [current])

  const handleNextImg = (e) => {
    e.stopPropagation()
    if (currentImg !== images.length) {
      setCurrentImg(currentImg + 1)
    }
  }

  const handlePrevImg = (e) => {
    e.stopPropagation()
    if (currentImg !== 0) {
      setCurrentImg(currentImg - 1)
    }
  }

  return (
    <GalleryWrapper onClick={closeGallery}>
      <PrevIcon onClick={handlePrevImg} color="#FFF" height={50} />
      <img height={700} src={images[currentImg]} />
      <NextIcon onClick={handleNextImg} color="#FFF" height={50} />
    </GalleryWrapper>
  )
} 


const ProjectPage = ({ data }) => {
  const { markdownRemark } = data

  return (
    <Layout>
      <Template
        images={markdownRemark.frontmatter.imageGallery}
        title={markdownRemark.frontmatter.title}
        description={markdownRemark.frontmatter.description}
      />
    </Layout>
  )
}

export default ProjectPage

export const projectPageQuery = graphql`
  query ProjectPage($slug: String!){
    markdownRemark(fields: {slug: {eq: $slug}}) {
      fields {
        slug
      }
      frontmatter {
        imageGallery
        title
        description
      }
    }
  }
`
