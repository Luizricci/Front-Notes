import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/FloatingButton.module.css';

export default function FloatingButton({ onClick }) {
  return (
    <button className={styles.floatingButton} onClick={onClick}>
      <PlusOutlined className={styles.icon} />
    </button>
  );
}
