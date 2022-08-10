import React from 'react';

import './errorMessage.css';

const ErrorMessage: React.FC = () => {
    return (
        <div className="error">
            <p>Ошибка запроса</p>
        </div>
    )
}

export default ErrorMessage;