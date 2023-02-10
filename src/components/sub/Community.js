import { text } from '@fortawesome/fontawesome-svg-core';
import React, { useState, useRef, useEffect } from 'react';
import Layout from '../common/Layout';
import Communitycard from './Communitycard';

const Community = () => {
    const initPost = [
        { title: 'Hello 1', content: 'Welcome Fp, React' },
        { title: 'Hello 2', content: 'Welcome Fp, React' },
        { title: 'Hello 3', content: 'Welcome Fp, React' },
        { title: 'Hello 4', content: 'Welcome Fp, React' },
        { title: 'Hello 5', content: 'Welcome Fp, React' },
    ];

    // 출력 목록 관리 state
    const [posts, setPosts] = useState(initPost);
    const input = useRef(null);
    const contents = useRef(null);
    const inputEdit = useRef(null);
    const textareaEdit = useRef(null);

    //업데이트 한개만 가능하도록

    const [Allowed, setAllowed] = useState(true);

    const createPost = () => {
        if (
            input.current.value.trim() === '' ||
            contents.current.value.trim() === ''
        ) {
            resetPost();
            return alert('제목과 본문을 입력하세요');
        }
        // 새로운 포스트 등록
        // state 업데이트라서 화면 갱신
        setPosts([
            ...posts,
            { title: input.current.value, content: contents.current.value },
        ]);

        resetPost();
        // 업데이트 가능
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

    const resetPost = () => {
        input.current.value = '';
        contents.current.value = '';
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
                if (idx === index) {
                    item.enableUpdate = false;
                }
                return item;
            })
        );
    };

    const updatePost = (idx) => {
        if (
            inputEdit.current.value.trim() ||
            !textareaEdit.current.value.trim()
        ) {
            inputEdit.current.value = '';
            textareaEdit.current.value = '';
            return alert('수정할 제목과 내용을 입력');
        }
        setPosts(
            posts.map((item, index) => {
                if (idx === index) {
                    item.title = inputEdit.current.value;
                    item.content = textareaEdit.current.value;
                    item.enableUpdate = false;
                }
                return item;
            })
        );
        setAllowed(true);
    };

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <Layout title={'Community'}>
            <div className='inputBox'>
                <form>
                    <input
                        type='text'
                        placeholder='제목을 입력하세요'
                        ref={input}
                    />
                    <br />
                    <textarea
                        cols='30'
                        rows='5'
                        placeholder='분류를 입력하세요'
                        ref={contents}
                    ></textarea>
                    <div className='btnSet'>
                        {/*form 안쪽에 버튼을 type을 정의한다 */}
                        <button type='button' onClick={resetPost}>
                            CANCEL
                        </button>
                        <button type='button' onClick={createPost}>
                            WRITE
                        </button>
                    </div>
                </form>
            </div>
            <div className='showBox'>
                {posts.map((item, idx) => (
                    <Communitycard
                        key={idx}
                        item={item}
                        inputEdit={inputEdit}
                        textareaEdit={textareaEdit}
                        disableUpdate={disableUpdate}
                        enableUpdate={enableUpdate}
                        deletePost={deletePost}
                        updatePost={updatePost}
                        index={idx}
                    ></Communitycard>
                ))}
            </div>
        </Layout>
    );
};

export default Community;
