import axios from 'axios';
import BASE from './keys';

export const main_url = axios.create({BASE_URL : BASE});

export default main_url