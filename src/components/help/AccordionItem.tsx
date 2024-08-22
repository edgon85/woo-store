import styles from './help.module.css';

type Props = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export const AccordionItem = ({ id, title, icon, content }: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className={`${styles.accordionCheckbox} hidden`}
      />
      <div className={styles.accordionItem}>
        <label htmlFor={id} className={styles.accordionLabel}>
          <span className="flex items-center">
            <span className="mr-3">{icon}</span>
            <span className="font-medium">{title}</span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.accordionIcon} ${styles.accordionIconDown}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.accordionIcon} ${styles.accordionIconUp}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className={styles.accordionContent}>
          <div className={styles.accordionContentInner}>{content}</div>
        </div>
      </div>
    </div>
  );
};
