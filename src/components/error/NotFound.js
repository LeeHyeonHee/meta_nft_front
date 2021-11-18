import React, { Fragment } from 'react';

function notFound(){
    return(
        <Fragment>
        {/* <Helmet> */}
            <title>찾을 수 없는 페이지 | 스마트 시티</title>
        {/* </Helmet> */}
            <div className="join__wrap">
                <div className="join__inner">
                <header className="join__header">
                    <h1 className="join__title">찾을 수 없는 페이지입니다.</h1>
                </header>
                <main className="join__main">
                    <div className="join__bottom">
                    <a className="button button__outline--primary" href="/">메인화면 이동</a>
                    </div>
                </main>
                </div>
            </div>
        </Fragment>
    )
}
export default notFound;