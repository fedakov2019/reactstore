import { render, screen } from '@testing-library/react';
import App from './App';
import {rerenderEntireTree} from "./render";
import state from "./redux/state";


rerenderEntireTree(state);


