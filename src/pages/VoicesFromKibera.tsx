import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ImageComponent from '../components/ImageComponent';
import { getImagePath } from '../imageRegistry';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageId: number;
  imageAlt: string;
  category: string;
}

function adeblog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<BlogPost[]>(`${API_BASE_URL}/api/blog-posts`);
        setBlogPosts(response.data || []);
      } catch (err) {
        setError('Unable to load stories right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (selectedPost) {
    return (
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
        <button
          onClick={() => setSelectedPost(null)}
          style={{
            background: '#a31515',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}
        >
          ← Back to All Stories
        </button>
        <article className="dark-card" style={{ background: '#a31515', borderRadius: 12, padding: '2rem', color: '#fff' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span
              style={{
                background: '#d32f2f',
                padding: '0.25rem 0.75rem',
                borderRadius: 20,
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {selectedPost.category}
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            {selectedPost.title}
          </h1>
          <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', opacity: 0.9 }}>
            By {selectedPost.author} • {new Date(selectedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <ImageComponent
              id={selectedPost.imageId}
              alt={selectedPost.imageAlt}
              width={800}
              height={400}
              customStyle={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </div>
          <div style={{ fontSize: '1.15rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {selectedPost.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <section style={{ background: '#f7f7f7', paddingBottom: '3rem', marginTop: '-1rem' }}>
      <section
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            width: '100%',
            minHeight: '260px',
            background: `linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), url(${getImagePath(25)}) center 10%/cover no-repeat`,
            borderRadius: '0 0 20px 20px',
          }}
        />

        <div
          style={{
            width: '100%',
            background: '#a31515',
            border: '2px solid #fff',
            borderRadius: '12px',
            padding: '0.7rem 1.15rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              color: '#ffffff',
              fontWeight: 800,
              lineHeight: 1.05,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 0', textAlign: 'left', fontSize: 'clamp(1rem, 1.9vw, 1.25rem)', fontWeight: 700, opacity: 0.95 }}>
              Sisi Ni Mashujaa
            </div>
            <div style={{ flex: '1 1 0', textAlign: 'center', fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', whiteSpace: 'nowrap' }}>
              Voices from Kibera
            </div>
            <div style={{ flex: '1 1 0', textAlign: 'right', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 600, opacity: 0.95 }}>
              Stories of Hope
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0.2rem auto 1.25rem', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <p style={{ fontSize: '1rem', color: '#a31515', maxWidth: 900, margin: '0 auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Inspiring stories of success, resilience, and hope from the ADE community
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>Loading stories...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#a31515', padding: '2rem' }}>{error}</div>
        ) : blogPosts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No stories yet.</div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="dark-card"
                onClick={() => setSelectedPost(post)}
                style={{
                  background: '#a31515',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ height: 220, overflow: 'hidden' }}>
                  <ImageComponent
                    id={post.imageId}
                    alt={post.imageAlt}
                    width={400}
                    height={220}
                    customStyle={{
                      width: '100%',
                      height: 220,
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        background: '#d32f2f',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 20,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#fff',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#fff', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            background: '#f5f5f5',
            borderRadius: 12,
          }}
        >
          <h3 style={{ marginBottom: '1rem', color: '#a31515' }}>Want to share your story?</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            We'd love to hear from you. Contact us to share your ADE experience.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              background: '#a31515',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: 4,
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#d32f2f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#a31515';
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default adeblog;
