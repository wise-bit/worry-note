// Styling
import './CardStyle.css';
import { useNavigate } from 'react-router-dom';

export default function Card({ cards }) {
  const navigate = useNavigate();

  const truncateContent = (string, len) => {
    if (string.length > len) {
      return string.slice(0, len) + '...';
    } else {
      return string;
    }
  };

  const cardClickHandler = (index) => {
    navigate('/view/' + index);
  };

  // Card color based on type
  const getCardColor = (type) => {
    let color = '#FFF'; // base color
    switch (type) {
      case 1:
        color = '#d2f0d2'; // green
        break;
      case 2:
        color = '#f0f0d2'; // yellow
        break;
      case 3:
        color = '#f0d2d2'; // red
        break;
      case 4:
        color = '#d2d2f0'; // purple/blue
        break;
      default:
        color = '#EEE'; // light grey
    }
    return color;
  };

  return (
    <>
      {cards.map((card, index) => {
        return (
          <div key={index} onClick={() => cardClickHandler(index)}>
            <div
              className='note-card-container'
              style={{ background: getCardColor(card?.type) }}
            >
              {/* Card Content */}
              <div>
                Subject:{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}
                >
                  {card.subject}
                </span>
              </div>

              <hr />

              {/* Card Content */}
              <div style={{ marginTop: '20px' }}>
                <div id='cardContent' style={{ whiteSpace: 'pre-wrap' }}>
                  {truncateContent(card.content, 170)}
                </div>
              </div>

              {/* Information */}
              <div className='view-more-info'>click to view full note</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
