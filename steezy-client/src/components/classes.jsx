import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Container, Pagination, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import qs from 'query-string';

import thumbnail1 from '../assets/class-thumbnail-1.jpg'
import thumbnail2 from '../assets/class-thumbnail-2.jpg'
import thumbnail3 from '../assets/class-thumbnail-3.jpg'

const paginationLimit = 9;

function Classes() {
  const [isLoading, setLoadingState] = useState(true);
  const [isAuthed, setAuth] = useState(false);
  const [state, setState] = useState({
    classList: [],
    totalNumbeOfClasses: 0,
    currentPaginationReference: null,
    activePageNumber: 0,
    classProgressList: {}
  });

  useEffect(() => {
    getClasses(true);
  }, [])

  async function getClassProgress(jwt, classes) {
    const classIdArray = classes.map(classItem => classItem.id)

    const response = await axios({
      method: 'get',
      url: `/users/progress?classIds=${classIdArray}`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    setState((prevState) => ({
      ...prevState,
      ...response.data,
    }));
  }

  async function getClasses(includeTotal, startAtKey = 0) {
    const queryObject = {};

    if (includeTotal) {
      queryObject.includeTotal = includeTotal;
    }

    if (startAtKey) {
      queryObject.startAtKey = startAtKey;
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
        ...response.data,
      }));

      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        setAuth(true);
        getClassProgress(jwt, response.data.classList);
      }
    } catch (err) {
      console.log('couldnt get classes');
    } finally {
      setLoadingState(false);
    }

  }

  function handleVideoClick(id) {
    if (isAuthed) {
      window.location.href = `classes/${id}`;
    } else {
      window.location.href = `login`;
    }
  }

  function mapProgress(index) {
    const videoId = index + state.activePageNumber * paginationLimit;

    return state.classProgressList[videoId]
  }

  function renderClasses() {
    return state.classList.map((classItem, index) => {
      const {title, instructor, level, song, thumbnailSlug} = classItem;
      const id = state.activePageNumber * paginationLimit + index; // ask me about this... #firebaseThings
      let renderedThumbnail = '';
      const progress = mapProgress(index)

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
        <Col key={classItem.title}>
          <Card style={{ width: '25rem', border: '0' }} className="bg-dark text-white" onClick={() => handleVideoClick(id)}>
            <Card.Img src={renderedThumbnail} alt="Card image" />
            <Card.ImgOverlay style={{ 'paddingLeft': '0','paddingTop': '0' }}>
              <Col md={10}  style={{ height:'100%', background: 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1))' }}> 
                <div style={{'marginLeft': '8px', 'textTransform': 'capitalize' }}>
                    <Card.Title className="text-white" style={{ 'minHeight': '130px', 'paddingTop': '8px' }}>{title}</Card.Title>
                    <Card.Text className="small text-white">
                      Instructor: <b>{instructor}</b>
                    </Card.Text>
                    <Card.Text className="small text-white">
                      Level: <b>{level}</b>
                    </Card.Text>
                    <Card.Text className="small text-white">
                      Song: <b>{song}</b> 
                    </Card.Text>
                </div>
              </Col>
            </Card.ImgOverlay>
            {
              isAuthed ? 
              (<ProgressBar style={{ 'borderRadius': '0 0 5px 5px', background: 'rgb(56,56,56)' }} now={progress}/>) :
              (<ProgressBar style={{ 'borderRadius': '0 0 5px 5px', background: 'rgb(56,56,56)' }} now={0}/>)
            }
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
            return (<Pagination.Item key={pageNumber} active={pageNumber === state.activePageNumber} onClick={() => handlePagination(pageNumber)} >{pageNumber}</Pagination.Item>)
          })
        }
        <Pagination.Next onClick={() => handlePagination(state.activePageNumber + 1)} />
      </Pagination>
    )
  }

  return (
    <div className="login d-infline-flex flex-column justify-content-center align-items-center">
      <Container>
      <Row>
        <Col className="title" md={2}>
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
            <Row md={12} className="mt-4">
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
