import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Default Title';
  // const size = searchParams.get('size') || 'Default Size';
  const imageUrl = searchParams.get('image') || '';
  const description = searchParams.get('description') || '';

  let imageComponent;
  try {
    const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());
    imageComponent = (
      <picture>
        <img
          src={`data:image/jpeg;base64,${Buffer.from(imageData).toString(
            'base64'
          )}`}
          style={{
            width: '45%',
            height: '90%',
            objectFit: 'contain',
          }}
          alt={title}
        />
      </picture>
    );
  } catch (error) {
    console.error('Error loading image:', error);
    imageComponent = (
      <div
        style={{
          width: '45%',
          height: '90%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: 24,
        }}
      >
        Image not available
      </div>
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '10px',
            }}
          >
            {title}
          </div>
          {/* <div style={{ fontSize: 24, color: '#666', marginBottom: '10px' }}>
            Talla: {size}
          </div> */}
          <div
            style={{
              fontSize: 18,
              color: '#444',
              marginTop: '10px',
              maxHeight: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </div>
        </div>
        {imageComponent}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

/* 
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '10px',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, color: '#666', marginBottom: '10px' }}>
            Talla: {size}
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#444',
              marginTop: '10px',
              maxHeight: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            width: '45%',
            height: '90%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
*/
