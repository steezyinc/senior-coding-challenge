import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Container, Pagination } from 'react-bootstrap';
import axios from 'axios';
import qs from 'query-string';

import thumbnail1 from '../assets/class-thumbnail-1.jpg'
import thumbnail2 from '../assets/class-thumbnail-2.jpg'
import thumbnail3 from '../assets/class-thumbnail-3.jpg'

const paginationLimit = 9;

function Classes({isAuthed}) {
  const [isLoading, setLoadingState] = useState(true);

  const [state, setState] = useState({
    classList: [],
    totalNumbeOfClasses: 0,
    currentPaginationReference: null,
    activePageNumber: 0
  });

  async function getClasses(includeTotal, startAtKey) {
    const queryObject = {}

    if (includeTotal) {
      queryObject.includeTotal = includeTotal
    }

    if (startAtKey) {
      queryObject.startAtKey = startAtKey
    }

    const query = qs.stringify(queryObject)
    const url = query ? `/classes?${query}` : '/classes'

    try {
      const response = await axios({
        method: 'get',
        url,
      });

      setState((prevState) => ({
        ...prevState,
        ...response.data
      }));
    } catch (err) {
      // todo: show something helpful
      console.log('couldnt get classes');
    } finally {
      setLoadingState(false);
    }
  }

  useEffect(() => {
    getClasses(true);
  }, [])

  function renderClasses() {
    return state.classList.map((classItem) => {
      const {title, instructor, level, song, thumbnailSlug, videoUrl} = classItem

      let renderedThumbnail = '';

      switch(thumbnailSlug) {
        case 'class-thumbnail-1.jpg':
          renderedThumbnail = thumbnail1;
          break;
        case 'class-thumbnail-2.jpg':
          renderedThumbnail = thumbnail2;
          break;
        case 'class-thumbnail-3.jpg':
          renderedThumbnail = thumbnail3;
          break;
        default:
      }

      return(
        <Col>
          <Card style={{width: '25rem'}} className="bg-dark text-white">
            <Card.Img src={renderedThumbnail} alt="Card image" />
            <Card.ImgOverlay>
              <Col md={8}> 
                <Card.Title className="text-info">{title}</Card.Title>
                <Card.Text className="small text-info">
                  Instructor: {instructor}
                </Card.Text>
                <Card.Text className="small text-info">
                  Level: {level}
                </Card.Text>
                <Card.Text className="small text-info">
                  Song: {song}
                </Card.Text>
              </Col>


            </Card.ImgOverlay>
          </Card>
        </Col>
      )
    })
  }

  function renderPagination() {
    const numberOfPages = Math.floor((state.totalNumberOfClasses) / paginationLimit) - 1
    let pageValues = [];

    if (state.activePageNumber <= 3) {
      pageValues = [0,1,2,3,4];
    } else if (numberOfPages - state.activePageNumber <= 2 ) {
      pageValues = [
        numberOfPages - 4,
        numberOfPages - 3,
        numberOfPages - 2,
        numberOfPages - 1,
        numberOfPages,
      ]
    } else {
      pageValues = [
        state.activePageNumber - 2,
        state.activePageNumber - 1,
        state.activePageNumber,
        state.activePageNumber + 1,
        state.activePageNumber + 2,
      ]
    }

    async function handlePagination(pageNumber) {
      if (pageNumber < 0 || pageNumber > Math.floor((state.totalNumberOfClasses) / paginationLimit) - 1) {
        return;
      }

      setState((prevState) => ({
        ...prevState,
        activePageNumber: pageNumber
      }));

      await getClasses(false, pageNumber * paginationLimit) 
    }

    return(
      <Pagination className="justify-content-md-center">
        <Pagination.Prev onClick={() => handlePagination(state.activePageNumber - 1)} />
        { 
          pageValues.map((pageNumber) => {
            return (<Pagination.Item active={pageNumber === state.activePageNumber} onClick={() => handlePagination(pageNumber)} >{pageNumber}</Pagination.Item>)
          })
        }
        <Pagination.Next onClick={() => handlePagination(state.activePageNumber + 1)} />
      </Pagination>
    )
  }

  return (
    <div className="login min-vh-100 d-infline-flex flex-column justify-content-center align-items-center">
      <Container>
      <Row>
        <Col classNames="title" md={2}>
          <h2 className="text-white">
            Classes
          </h2>
        </Col>
        <Col md={10}></Col>
      </Row>
      { isLoading ?
        (
          <>
            <Spinner animation="border" variant="info" /> Loading...
          </>  
        ) :
        (
          <>
            <Row md={3} className="g-3">
              { renderClasses() }
            </Row>
            <Row md={12}>
              {renderPagination()}
            </Row>
          </>
        )
      }
      </Container>
    </div>
  );
}

export default Classes;
