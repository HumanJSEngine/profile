import React, { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';
import Communitycard from './Communitycard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import dompurify from 'dompurify';
import { ResponsivePie } from '@nivo/pie';

// 02. form 요소의 항목별 에러체크
const schema = yup.object({
    title: yup.string().trim().required('제목을 입력해주세요'),
    content: yup.string().trim().required('내용을 입력해주세요'),
    timestamp: yup.string().trim().required('날짜를 선택해 주세요'),
});

// XSS 공격 방어 라이브러리

const Community = () => {
    //handleSubmit : form에서 onSubmit시 실행
    //reset : form에서 reset 할때 실행
    // formState : {erros} yup 에러 출력 활용
    const {
        register,
        handleSubmit,
        reset,
        //폼이 아니라 강제로 값을 셋팅하는 메서드
        setValue,
        trigger,
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
        console.log('submit 으로 넘겨진 데이터');
        console.log(data);
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

    const quillRef = useRef(null);

    const imageHandler = () => {
        console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 작동');
        // 1. 이미지를 저장할 input type="file" 을 생성한다.
        const input = document.createElement('input');
        // 2. 속성을 세팅한다.
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        // 에디터 이미지버튼을 클릭하면 input이 클릭되도록 한다.
        input.click();
        input.addEventListener('change', async () => {
            console.log('이미지 선택');
            const file = input.files[0];
            // 이미지를 변형한다.
            const formData = new FormData();
            // formData 와 형식은 key-value 구조
            formData.append('img', file);
            // formData를 백엔드로 전송하고 주소를 받아온다
            try {
                const result = await axios.post(
                    'http://localhost:3000/images',
                    formData
                );
                console.log(
                    '성공시, 백엔드가 보내주는 데이터',
                    result.data.url
                );
                const imgURL = result.data.url;
                // ReactQuill Editer에 html 수정해서 삽입
                // useRef를 이용해서 해당 요소를 선택한다.
                const editer = quillRef.current.getEditor();
                // 현재 에디터 커서 위치값을 파악
                console.log(editer);
                const range = editer.getSelection();
                // 가져온 이미지를 삽입해서 출력한다.
                editer.insertEmbed(range.index, 'image', imgURL);
            } catch (error) {
                console.log('이미지 전송 실패');
            }
        });
    };

    // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
    const modules = React.useMemo(
        () => ({
            toolbar: {
                // container에 등록되는 순서대로 tool 배치
                container: [
                    [{ font: [] }], // font 설정
                    [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
                    [
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'code-block',
                        'formula',
                    ], // 굵기, 기울기, 밑줄 등 부가 tool 설정
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ], // 리스트, 인덴트 설정
                    ['link', 'image', 'video'], // 링크, 이미지, 비디오 업로드 설정
                    [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
                    ['clean'], // toolbar 설정 초기화 설정
                ],
                handlers: {
                    images: imageHandler,
                },
            },
        }),
        []
    );

    // toolbar에 사용되는 tool format
    const formats = [
        'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'formula',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'align',
        'color',
        'background',
    ];

    const handleChange = (value) => {
        console.log(value);
        //XSS 공격에 대한 처리 : dompurfiy
        setTag(value);
        setValue('contents', value === '<p><br></p>' ? '' : value);
        // onChange가 되었는지 여부를 react-hook-form에 알려준다
        trigger('contents');
    };
    // ReactQuill 에서 image를 바로 서버로 저장하면 곤란
    // ReactQuill 을 위해서 imagehandler를 만들어야 함
    // 먼저 이미지를 이미지 전용 서버에 보내고,
    // 주소를 다시 돌려받아서
    // 주소를 DB로 보낸다.

    //html 글자를 화면에 출력하기 위한 샘플
    //ReactQuill에서 입력되는 사항을 출력하기 위한 처리
    const [tag, setTag] = useState("<p><b onClick='alert(5)'>Hello</b></p>");

    const chartData = [
        {
            id: 'lisp',
            label: 'lisp',
            value: 511,
            color: 'hsl(174, 70%, 50%)',
        },
        {
            id: 'erlang',
            label: 'erlang',
            value: 272,
            color: 'hsl(357, 70%, 50%)',
        },
        {
            id: 'c',
            label: 'c',
            value: 160,
            color: 'hsl(154, 70%, 50%)',
        },
        {
            id: 'ruby',
            label: 'ruby',
            value: 79,
            color: 'hsl(230, 70%, 50%)',
        },
        {
            id: 'javascript',
            label: 'javascript',
            value: 443,
            color: 'hsl(45, 70%, 50%)',
        },
    ];

    return (
        <Layout title={'Community'}>
            <div
                style={{
                    width: '400px',
                    height: '400px',
                    margin: '0 auto',
                    objectFit: 'cover',
                }}
            >
                <ResponsivePie
                    data={chartData}
                    margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor='#333333'
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 2]],
                    }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'ruby',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'c',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'go',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'python',
                            },
                            id: 'dots',
                        },
                        {
                            match: {
                                id: 'scala',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'lisp',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'elixir',
                            },
                            id: 'lines',
                        },
                        {
                            match: {
                                id: 'javascript',
                            },
                            id: 'lines',
                        },
                    ]}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000',
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
            <div>{tag}</div>
            {/* XSS 공격 받을 수 있으므로 아래 구문은 비추천한다. */}
            {/* 예를 들어서 사용자가 html 입력하면서 js 구문을 추가해서 정보취득 */}
            <div
                dangerouslySetInnerHTML={{
                    __html: dompurify.sanitize(String(tag)),
                }}
            />

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
                    {/* 위지윅에디터 React-quill */}
                    <div>
                        <ReactQuill
                            ref={quillRef}
                            modules={modules}
                            formats={formats}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
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
