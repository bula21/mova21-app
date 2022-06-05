import React from 'react';
import styled from 'styled-components/native';

const loadingImage = require('../../../assets/loading.gif');

const LoadingView = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LoadingImage = styled.Image`
    height: 100px;
    width: 100px;
`;

export default function MovaLoading() {
    return (
        <LoadingView>
            <LoadingImage source={loadingImage} />
        </LoadingView>
    );
}
