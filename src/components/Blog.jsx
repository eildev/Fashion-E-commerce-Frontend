import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetBlogQuery } from '../redux/features/api/blogApi';
import { useGetBlogCategoryQuery } from '../redux/features/api/blogCategoryApi';
import { imagePath } from './imagePath';

const Blog = () => {
    const { data, isLoading, isError } = useGetBlogQuery();
    const { data: categoryData, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetBlogCategoryQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const articlesPerPage = 2;

    if (isLoading || isLoadingCategory) {
        return <div className="text-center mt-10">Loading blogs...</div>;
    }

    if (isError || isErrorCategory) {
        return <div className="text-center mt-10 text-red-500">Failed to load blogs or categories. Please try again later.</div>;
    }

    // Sort blogs by date (latest first)
    const sortedBlogs = data?.blogPost
        ?.slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Filter blogs based on search query and selected category
    const filteredBlogs = sortedBlogs?.filter((blog) => {
        const query = searchQuery.toLowerCase();
        const title = blog.title?.toLowerCase() || '';
        const tags = blog.tags?.toLowerCase() || '';
        const categoryName = categoryData?.blogCat?.find(cat => cat.id === blog.cat_id)?.cat_name?.toLowerCase() || '';
        const matchesSearch = (
            title.includes(query) ||
            tags.includes(query) ||
            categoryName.includes(query)
        );
        const matchesCategory = selectedCategory ? blog.cat_id === selectedCategory : true;
        return matchesSearch && matchesCategory;
    }) || [];

    // Pagination logic
    const totalArticles = filteredBlogs.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const currentArticles = filteredBlogs.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Generate pagination buttons
    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button
                        className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                        onClick={() => handlePageChange(i)}
                    >
                        {i < 10 ? `0${i}` : i}
                    </button>
                </li>
            );
        }

        return (
            <ul className="pagination flex-align flex-wrap gap-16">
                <li className="page-item">
                    <button
                        className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="ph-bold ph-arrow-left" />
                    </button>
                </li>
                {pages}
                <li className="page-item">
                    <button
                        className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="ph-bold ph-arrow-right" />
                    </button>
                </li>
            </ul>
        );
    };

    return (
        <section className="blog py-80">
            <div className="container container-lg">
                <div className="row gy-5">
                    <div className="col-lg-8 pe-xl-4">
                        <div className="blog-item-wrapper">
                            {currentArticles?.length > 0 ? (
                                currentArticles.map((article) => (
                                    <div key={article.id} className="blog-item">
                                        <Link
                                            to={`/blog-details/${article.id}`}
                                            className="w-100 h-100 rounded-16 overflow-hidden"
                                        >
                                            <img
                                                src={imagePath(article?.image)}
                                                alt={article?.title || 'Blog Post'}
                                                className="cover-img"
                                            />
                                        </Link>
                                        <div className="blog-item__content mt-24">
                                            <span className="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">
                                                {article?.tags || 'Uncategorized'}
                                            </span>
                                            <h6 className="text-2xl mb-24">
                                                <Link to={`/blog-details/${article.id}`} className="">
                                                    {article?.title}
                                                </Link>
                                            </h6>
                                            <p className="text-gray-700 text-line-2">
                                                {article?.desc}
                                            </p>
                                            <div className="flex-align flex-wrap gap-24 pt-24 mt-24 border-top border-gray-100">
                                                <div className="flex-align flex-wrap gap-8">
                                                    <span className="text-lg text-main-600">
                                                        <i className="ph ph-calendar-dots" />
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        <Link
                                                            to={`/blog-details/${article.id}`}
                                                            className="text-gray-500 hover-text-main-600"
                                                        >
                                                            {new Date(article.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="flex-align flex-wrap gap-8">
                                                    <span className="text-lg text-main-600">
                                                        <i className="ph ph-chats-circle" />
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        <Link
                                                            to={`/blog-details/${article.id}`}
                                                            className="text-gray-500 hover-text-main-600"
                                                        >
                                                            0 Comments
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-32 text-gray-600 text-md">
                                    No blogs found matching your search or category.
                                </div>
                            )}
                        </div>
                        {/* Pagination Start */}
                        {totalArticles > 0 && renderPagination()}
                        {/* Pagination End */}
                    </div>
                    <div className="col-lg-4 ps-xl-4">
                        {/* Search Start */}
                        <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                            <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                Search Here
                            </h6>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control common-input bg-color-three"
                                        placeholder="Search by title, tags, or category..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setCurrentPage(1); // Reset to first page on search
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-main text-2xl h-56 w-56 flex-center text-2xl input-group-text"
                                    >
                                        <i className="ph ph-magnifying-glass" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Search End */}
                        {/* Recent Post Start */}
                        <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                            <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                Recent Posts
                            </h6>
                            {sortedBlogs?.slice(0, 4).map((post) => (
                                <div
                                    key={post.id}
                                    className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16"
                                >
                                    <Link
                                        to={`/blog-details/${post.id}`}
                                        className="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
                                    >
                                        <img
                                            src={imagePath(post?.image)}
                                            alt={post?.title || 'Recent Post'}
                                            className="cover-img"
                                        />
                                    </Link>
                                    <div className="flex-grow-1">
                                        <h6 className="text-lg">
                                            <Link to={`/blog-details/${post.id}`} className="text-line-3">
                                                {post?.title}
                                            </Link>
                                        </h6>
                                        <div className="flex-align flex-wrap gap-8">
                                            <span className="text-lg text-main-600">
                                                <i className="ph ph-calendar-dots" />
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                <Link
                                                    to={`/blog-details/${post.id}`}
                                                    className="text-gray-500 hover-text-main-600"
                                                >
                                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Recent Post End */}
                        {/* Category Start */}
                        <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                            <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                Category
                            </h6>
                            <ul>
                                <li className="mb-16">
                                    <button
                                        className={`flex-between gap-8 w-100 text-gray-700 border border-gray-100 rounded-4 p-4 ps-16 hover-border-main-600 hover-text-main-600 ${!selectedCategory ? 'bg-main-50 text-main-600' : ''}`}
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setCurrentPage(1); // Reset to first page on category change
                                        }}
                                    >
                                        <span>All Categories</span>
                                        <span className="w-40 h-40 flex-center rounded-4 bg-main-50 text-main-600">
                                            <i className="ph ph-arrow-right" />
                                        </span>
                                    </button>
                                </li>
                                {categoryData?.blogCat?.map((cat) => (
                                    <li key={cat?.id} className="mb-16">
                                        <button
                                            className={`flex-between gap-8 w-100 text-gray-700 border border-gray-100 rounded-4 p-4 ps-16 hover-border-main-600 hover-text-main-600 ${selectedCategory === cat.id ? 'bg-main-50 text-main-600' : ''}`}
                                            onClick={() => {
                                                setSelectedCategory(cat.id);
                                                setCurrentPage(1); // Reset to first page on category change
                                            }}
                                        >
                                            <span>{cat?.cat_name}</span>
                                            <span className="w-40 h-40 flex-center rounded-4 bg-main-50 text-main-600">
                                                <i className="ph ph-arrow-right" />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Category End */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;