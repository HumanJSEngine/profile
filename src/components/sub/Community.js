import React, { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';
import Communitycard from './Communitycard';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// 02. form 요소의 항목별 에러체크
const schema = yup.object({
    title: yup.string().trim().required('제목을 입력해주세요'),
    content: yup.string().trim().required('내용을 입력해주세요'),
    timestamp: yup.string().trim().required('날짜를 선택해 주세요'),
});

const Community = () => {
    //handleSubmit : form에서 onSubmit시 실행
    //reset : form에서 reset 할때 실행
    // formState : {erros} yup 에러 출력 활용
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), //yup과 연결 시켜줌
        mode: 'onChange',
    });

    const initPost = [
        { title: 'Hello 1', content: 'Welcome Fp, React' },
        { title: 'Hello 2', content: 'Welcome Fp, React' },
        { title: 'Hello 3', content: 'Welcome Fp, React' },
        { title: 'Hello 4', content: 'Welcome Fp, React' },
        { title: 'Hello 5', content: 'Welcome Fp, React' },
    ];

    const getLocalPost = () => {
        const data = localStorage.getItem('post');
        console.log(data);
        if (data === null) {
            return [];
        } else {
            return JSON.parse(data);
        }
    };

    // 출력 목록 관리 state
    const [posts, setPosts] = useState(getLocalPost());
    const [Allowed, setAllowed] = useState(true);
    const [imgFile, setImgFile] = useState('');

    const createPost = (data) => {
        setPosts([...posts, data]);
        reset();
        setAllowed((prev) => true);
        setPosts((prev) => {
            const arr = [...prev];
            const updateArr = arr.map((item, index) => {
                item.enableUpdate = false;
                return item;
            });
            return updateArr;
        });
    };

    const enableUpdate = (idx) => {
        //한개만 업데이트 가능하도록 처리
        if (!Allowed) return;
        setAllowed(false);
        setPosts(
            posts.map((item, index) => {
                if (idx === index) {
                    item.enableUpdate = true;
                }
                return item;
            })
        );
    };

    const deletePost = (idx) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }
        setPosts(
            posts.filter((item, index) => {
                return idx !== index;
            })
        );
    };

    const disableUpdate = (idx) => {
        setAllowed(true);
        setPosts(
            posts.map((item, index) => {
                if (index === idx) {
                    item.enableUpdate = false;
                }
                return item;
            })
        );
    };

    const updatePost = (data) => {
        // if (
        //     !inputEdit.current.value.trim() ||
        //     !textareaEdit.current.value.trim()
        // ) {
        //     inputEdit.current.value = '';
        //     textareaEdit.current.value = '';
        //     return alert('수정할 제목과 내용을 입력');
        // }
        setPosts(
            posts.map((item, index) => {
                if (parseInt(data.index) === index) {
                    item.title = data.title;
                    item.content = data.content;
                    item.timestamp = data.timestamp;
                    item.enableUpdate = false;
                }
                return item;
            })
        );
        setAllowed(true);
    };

    //로컬에 저장
    useEffect(() => {
        localStorage.setItem('post', JSON.stringify(posts));
    }, [posts]);

    //이미지 업로드 및 미리보기
    const imgRef = useRef(null);
    const onChangeImg = async (e) => {
        e.preventDefault();
        if (e.target.files) {
            //files는 배열에 담긴다
            //file이 1개 이므로 e.target.files[0]
            const uploadFile = e.target.files[0];
            console.log(uploadFile);
            // 이미지를 읽어들이는 바닐라 함수
            const reader = new FileReader();
            reader.readAsDataURL(uploadFile);
            reader.onloadend = () => {
                // 임시 이미지가 만들어진다. useState
                setImgFile(reader.result);
            };

            // 서버로 이미지를 임시로 보내고 URL 글자를 받아오는 코드
            // 파일을 강제로 업로드 한다

            const formData = new FormData();
            formData.append('files', uploadFile);
            await axios({
                method: 'post',
                url: '/api/files/images',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // ./images/aaa.gif
        }
    };

    return (
        <Layout title={'Community'}>
            <div className='inputBox'>
                <form onSubmit={handleSubmit(createPost)}>
                    <input
                        type='text'
                        placeholder='제목을 입력하세요'
                        {...register('title')}
                    />
                    <span className='err'>{errors.title?.message}</span>
                    <br />
                    <textarea
                        cols='30'
                        rows='5'
                        placeholder='분류를 입력하세요'
                        {...register('content')}
                    ></textarea>
                    <span className='err'>{errors.content?.message}</span>
                    <br />

                    <input type='date' {...register('timestamp')} />
                    <span className='err'>{errors.timestamp?.message}</span>
                    <br />
                    <div>
                        <img src={imgFile} alt='프로필 이미지' />
                        <input
                            type='file'
                            accept='image/*'
                            onInput={onChangeImg}
                            ref={imgRef}
                        ></input>
                    </div>
                    <div className='btnSet'>
                        {/*form 안쪽에 버튼을 type을 정의한다 */}
                        <button type='reset'>CANCEL</button>
                        <button type='submit'>WRITE</button>
                    </div>
                </form>
            </div>
            <div className='showBox'>
                {posts.map((item, idx) => (
                    <Communitycard
                        key={idx}
                        item={item}
                        disableUpdate={disableUpdate}
                        updatePost={updatePost}
                        enableUpdate={enableUpdate}
                        deletePost={deletePost}
                        index={idx}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Community;
