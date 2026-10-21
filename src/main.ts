/**
 * Entry point: stylesheet + bootstrap. All wiring lives in bootstrap.ts
 * (kept CSS-free so tests can import it under tsx).
 */
import './styles/main.css';
import { bootstrap } from './bootstrap';

void bootstrap();
