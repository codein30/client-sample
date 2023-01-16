from resources.auth import Auth, AuthModel
import jwt
import pytest
import hashlib
from unittest.mock import patch
import werkzeug
from libs.response_helper import response_to_json
from libs.shared.config import Config
from libs.config_singleton import ConfigSingleton

redplanet_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJibHVlc3VuIiwia2lkIjoiQVNERiIsImlhdCI6MTUxNjIzOTAyMn0.o2x8zbZYS1Whb30-vdHB8W10ZmmLSavAz8_JROznrdg'  # noqa: E501
redplanet_domain = 'localhost'
redplanet_client_id = '12345'
redplanet_host = f'{redplanet_domain}:80'
redplanet_key = 'foo'
saturn-co_client = 'redplanet'
redplanet_jit = hashlib.sha256(redplanet_client_id.encode()).hexdigest()


@pytest.fixture
def auth():
    return Auth()


@pytest.fixture
def mock_config_response():
    return {
        'api': {
            'domains': {
                f'{redplanet_domain}': redplanet_client_id
            },
            'api_keys': {
                f'{redplanet_client_id}': {
                    'client': 'redplanet',
                    'key': redplanet_key
                }
            }
        }
    }


def test_get_auth_key(auth):
    with patch.object(Auth, 'get_auth_key', return_value=[redplanet_client_id, redplanet_key]):
        client_key, key = auth.get_auth_key(redplanet_domain)
        assert client_key == redplanet_client_id
        assert key == redplanet_key


def test_get_auth_saturn-co_client(auth, mock_config_response):
    with patch.object(ConfigSingleton, 'get_config', return_value=mock_config_response):
        client = auth.get_auth_saturn-co_client(redplanet_domain)
        assert client == saturn-co_client


def test_get_auth_key_throws_with_invalid_host(auth, mock_config_response):
    with patch.object(Config, 'get_config', return_value=mock_config_response):
        with pytest.raises(KeyError):
            auth.get_auth_key('google.com')


def test_decode_token(auth):
    payload = auth.decode_token(redplanet_token, redplanet_key)
    assert payload['sub'] == 'redplanet'


def test_decode_token_bad_secret_fails(auth):
    with pytest.raises(jwt.InvalidTokenError):
        bad_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJibHVlc3VuIiwia2lkIjoiQVNERiIsImlhdCI6MTUxNjIzOTAyMn0.BpTLSX7CsxDcA_mxJ9txjl_04t58f2054TXGnl4Hw0A'  # noqa: E501
        auth.decode_token(bad_token, redplanet_key)


def test_create_access_token(auth):
    token = auth.create_access_token('foo', redplanet_domain, 'bar')
    payload = jwt.decode(token, redplanet_key, verify=False)
    assert payload['sub'] == redplanet_domain


def test_validate_access_token_identity(auth):
    payload = {
        'sub': redplanet_domain,
        'jit': redplanet_jit
    }
    with patch.object(Auth, 'get_auth_key', return_value=[redplanet_client_id, redplanet_key]):
        auth.validate_access_token_identity(redplanet_host, payload)


def test_validate_access_token_identity_raises_bad_request_host(auth):
    payload = {
        'sub': redplanet_domain,
        'jit': redplanet_jit
    }
    with patch.object(Auth, 'get_auth_key', return_value=[redplanet_client_id, redplanet_key]):
        with pytest.raises(werkzeug.exceptions.MethodNotAllowed):
            auth.validate_access_token_identity('wrong_domain:80', payload)


def test_validate_access_token_identity_raises_bad_sub(auth):
    payload = {
        'sub': 'wrong_domain',
        'jit': redplanet_jit
    }
    with patch.object(Auth, 'get_auth_key', return_value=[redplanet_client_id, redplanet_key]):
        with pytest.raises(werkzeug.exceptions.MethodNotAllowed):
            auth.validate_access_token_identity(redplanet_host, payload)


def test_validate_access_token_identity_raises_bad_jit(auth):
    payload = {
        'sub': redplanet_domain,
        'jit': 'bad_jit'
    }
    with patch.object(Auth, 'get_auth_key', return_value=[redplanet_client_id, redplanet_key]):
        with pytest.raises(werkzeug.exceptions.MethodNotAllowed):
            auth.validate_access_token_identity(redplanet_host, payload)


def test_post(test_client):
    expected = 'access token'
    with patch.object(Config, 'secret', returns='foo'):
        with patch.object(Auth, 'get_auth_key', return_value=[redplanet_client_id, redplanet_key]):
            with patch.object(Auth, 'create_access_token', return_value=expected):
                model = AuthModel()
                model['client_assertion_type'] = 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'
                model['client_assertion'] = redplanet_token
                response = test_client.post('/auth', data=model)
                assert response_to_json(response) == expected
