import { PlusOutlined, InboxOutlined, FolderOpenOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styles from '../styles/FloatingButton.module.css';

export default function FloatingButton({ 
  onClick, 
  icon = 'plus', 
  position = 'topRight',
  tooltip 
}) {
  const getIcon = () => {
    switch (icon) {
      case 'plus':
        return <PlusOutlined className={styles.icon} />;
      case 'archive':
        return <InboxOutlined className={styles.icon} />;
      case 'unarchive':
        return <FolderOpenOutlined className={styles.icon} />;
      case 'back':
        return <ArrowLeftOutlined className={styles.icon} />;
      default:
        return <PlusOutlined className={styles.icon} />;
    }
  };

  const getPositionClass = () => {
    if (icon === 'back') {
      return styles.backButton;
    }
    switch (position) {
      case 'topLeft':
        return styles.topLeft;
      case 'topRight':
      default:
        return styles.topRight;
    }
  };

  return (
    <button 
      className={`${styles.floatingButton} ${getPositionClass()}`} 
      onClick={onClick}
      title={tooltip}
    >
      {getIcon()}
    </button>
  );
}
