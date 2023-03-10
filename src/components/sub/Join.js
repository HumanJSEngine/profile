import React, { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import Layout from '../common/Layout';

const Join = () => {
    let initVal = {
        userid: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
        address: '',
        address2: '',
        gender: '',
        birthday: '',
        interests: '',
        edu: '',
        hobby: null,
        comment: '',
    };
    const [val, setVal] = useState(initVal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVal({ ...val, [name]: value });
    };

    const handleRadio = (e) => {
        const { name, id } = e.target;
        setVal({ ...val, [name]: id });
    };

    const handleCheck = (e) => {
        let isCheck = false;
        const { name } = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input');
        let data = {};
        for (let item of inputs) {
            let { id, checked } = item;
            data[id] = checked;
            if (item.checked) isCheck = true;
        }
        setVal((prev) => {
            const obj = { ...prev };
            obj.hobby = data;
            return obj;
        });

        setVal((prev) => {
            const obj = { ...prev };
            obj[name] = isCheck;
            return obj;
        });
    };

    const [postVisible, setPostVisible] = useState(false);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setVal({ ...val, address: fullAddress });
        setPostVisible(false);
    };

    // ?????? ?????? ?????? ??????
    const [Err, setErr] = useState({});
    const check = (_val) => {
        const errs = {};
        // ????????? ??????
        if (_val.userid.length < 5) {
            errs.userid = '???????????? 5?????? ?????? ??????????????????.';
        }
        // ????????? ??????/????????? ??????????????? ????????? ??????
        if (_val.email.length < 8 || !/@/.test(_val.email)) {
            errs.email = '???????????? ?????? 8?????? ?????? @??? ????????? ?????????.';
        }
        if (_val.phone === '') {
            errs.phone = '??????????????? ???????????????';
        }

        // ????????????
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[!@#$%^&*()_+]/;
        if (
            _val.password.length < 5 ||
            !eng.test(_val.password) ||
            !num.test(_val.password) ||
            !spc.test(_val.password)
        ) {
            errs.password =
                '??????????????? 5?????? ??????, ??????, ??????, ??????????????? ?????? ????????? ?????????.';
        }
        // ????????????2 ??????
        if (_val.password !== _val.password2 || !_val.password2) {
            errs.password2 = '??????????????? ???????????? ??????????????????.';
        }
        // ?????? ??????
        if (_val.gender === '') {
            errs.gender = '????????? ???????????????.';
        }
        // ????????? ??????
        if (!_val.interests) {
            errs.interests = '???????????? ???????????? ??????????????????.';
        }
        // ????????????
        if (_val.edu === '') {
            errs.edu = '????????? ??????????????????.';
        }
        if (_val.comment.length < 20) {
            errs.comment = '????????? ?????? 20?????? ?????? ??????';
        }
        //?????? ??????
        if (_val.address === '') {
            errs.address = '????????? ??????????????????';
        }
        if (_val.address === '') {
            errs.address2 = '??????????????? ??????';
        }
        //???????????? ??????
        if (_val.birthday === '') {
            errs.birthday = '??????????????? ??????';
        }

        return errs;
    };

    const handleReset = () => {
        setVal(initVal);
        setErr({});
    };

    useEffect(() => {
        console.log(val);
    }, [val]);
    useEffect(() => {
        console.log(Err);
    }, [Err]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr(check(val));
    };

    const handlePhone = (e) => {
        const { name } = e.target;
        let value = e.target.value;
        value = value
            .replace(/[^0-9]/g, '') // ????????? ????????? ?????? ?????? ??????
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

        setVal({ ...val, [name]: value });
    };

    const handleBirthday = (e) => {
        const { name } = e.target;
        let value = e.target.value;
        value = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        setVal({ ...val, [name]: value });
    };

    return (
        <Layout title={'Join'}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>?????? ??????</legend>
                    <table>
                        <caption>?????? ?????? ?????? ??????</caption>
                        <tbody>
                            {/* ????????? ?????? */}
                            <tr>
                                <th>
                                    <label htmlFor='userid'>USER ID</label>
                                </th>
                                <td>
                                    <input
                                        type='text'
                                        id='userid'
                                        name='userid'
                                        placeholder='???????????? ???????????????.'
                                        onChange={handleChange}
                                    />
                                    <span className='err'>{Err.userid}</span>
                                </td>
                            </tr>
                            {/* ????????? */}
                            <tr>
                                <th>
                                    <label htmlFor='email'>E-MAIL</label>
                                </th>
                                <td>
                                    <input
                                        type='text'
                                        id='email'
                                        name='email'
                                        placeholder='????????? ????????? ??????????????????.'
                                        onChange={handleChange}
                                    />
                                    <span className='err'>{Err.email}</span>
                                </td>
                            </tr>
                            {/* ???????????? */}
                            <tr>
                                <th>
                                    <label htmlFor='phone'>PHONE</label>
                                </th>
                                <td>
                                    <input
                                        type='text'
                                        id='phone'
                                        name='phone'
                                        placeholder='??????????????? ??????'
                                        maxLength={13}
                                        onChange={handlePhone}
                                        value={val.phone}
                                    />
                                    <span className='err'>{Err.phone}</span>
                                </td>
                            </tr>
                            {/* ???????????? */}
                            <tr>
                                <th>
                                    <label>PASSWORD</label>
                                </th>
                                <td>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='??????????????? ???????????????'
                                        onChange={handleChange}
                                    />
                                    <span className='err'>{Err.password}</span>
                                </td>
                            </tr>
                            {/* ????????????2 */}
                            <tr>
                                <th>
                                    <label htmlFor='address'>Address</label>
                                </th>
                                <td>
                                    <input
                                        type='text'
                                        name='address'
                                        id='address'
                                        placeholder='????????? ??????'
                                        onChange={handleChange}
                                        readOnly
                                        onClick={() =>
                                            setPostVisible(!postVisible)
                                        }
                                        style={{ cursor: 'pointer' }}
                                        value={val.address}
                                    />
                                    <span className='err'>{Err.address}</span>
                                    {postVisible && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                background: '#FFF',
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    setPostVisible(false)
                                                }
                                            >
                                                ??????
                                            </button>
                                            <DaumPostcodeEmbed
                                                onComplete={handleComplete}
                                                style={{
                                                    width: 400,
                                                    height: 600,
                                                }}
                                            />
                                        </div>
                                    )}
                                    <br />
                                    <input
                                        type='text'
                                        id='address2'
                                        name='address2'
                                        placeholder='??????????????? ???????????????'
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            {/* ???????????? */}
                            <tr>
                                <th>
                                    <label htmlFor='birthday'>BIRTHDAY</label>
                                </th>
                                <td>
                                    <input
                                        type='date'
                                        id='birthday'
                                        name='birthday'
                                        placeholder='??????????????? ????????? ?????????'
                                        onChange={handleBirthday}
                                        maxLength={13}
                                    />
                                    <span className='err'>{Err.birthday}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='password2'>
                                        PASSWORD ??????
                                    </label>
                                </th>
                                <td>
                                    <input
                                        type='password'
                                        id='password2'
                                        name='password2'
                                        placeholder='??????????????? ???????????????'
                                        onChange={handleChange}
                                    />
                                    <span className='err'>{Err.password2}</span>
                                </td>
                            </tr>
                            {/* ???????????? */}
                            <tr>
                                <th>GENDER</th>
                                <td>
                                    <label htmlFor='male'>Male</label>
                                    <input
                                        type='radio'
                                        id='male'
                                        name='gender'
                                        onChange={handleRadio}
                                    />
                                    <label htmlFor='female'>Female</label>
                                    <input
                                        type='radio'
                                        id='female'
                                        name='gender'
                                        onChange={handleRadio}
                                    />
                                    <span className='err'>{Err.gender}</span>
                                </td>
                            </tr>
                            {/* ????????? */}
                            <tr>
                                <th>INTERESTS</th>
                                <td>
                                    <label htmlFor='sports'>Sports</label>
                                    <input
                                        type='checkbox'
                                        id='sports'
                                        name='interests'
                                        onChange={handleCheck}
                                    />
                                    <label htmlFor='music'>Music</label>
                                    <input
                                        type='checkbox'
                                        id='music'
                                        name='interests'
                                        onChange={handleCheck}
                                    />
                                    <label htmlFor='game'>Game</label>
                                    <input
                                        type='checkbox'
                                        id='game'
                                        name='interests'
                                        onChange={handleCheck}
                                    />
                                    <label htmlFor='etc'>Etc</label>
                                    <input
                                        type='checkbox'
                                        id='etc'
                                        name='interests'
                                        onChange={handleCheck}
                                    />
                                    <span className='err'>{Err.interests}</span>
                                </td>
                            </tr>
                            {/* ???????????? */}
                            <tr>
                                <th>EDUCATION</th>
                                <td>
                                    <select
                                        name='edu'
                                        id='edu'
                                        onChange={handleChange}
                                    >
                                        <option value=''>
                                            ????????? ???????????????.
                                        </option>
                                        <option value='step-1'>
                                            ???????????? ??????
                                        </option>
                                        <option value='step-2'>
                                            ????????? ??????
                                        </option>
                                        <option value='step-3'>
                                            ???????????? ??????
                                        </option>
                                        <option value='step-4'>
                                            ????????? ??????
                                        </option>
                                    </select>
                                    <span className='err'>{Err.edu}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='comment'>COMMENT</label>
                                </th>
                                <td>
                                    <textarea
                                        name='comment'
                                        id='comment'
                                        cols='30'
                                        row='5'
                                        placeholder='????????? ?????? ??????'
                                        onChange={handleChange}
                                    ></textarea>
                                    <span className='err'>{Err.comment}</span>
                                </td>
                            </tr>
                            {/* ??? ?????? */}
                            <tr>
                                <th colSpan='2'>
                                    <input
                                        type='reset'
                                        onClick={handleReset}
                                        value='RESET'
                                    />
                                    <input type='submit' value='SUBMIT' />
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </form>
        </Layout>
    );
};

export default Join;
