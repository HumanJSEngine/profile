import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import Communitycard from './Communitycard';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
