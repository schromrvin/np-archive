

export function Timeline() {
    const timelineUrl = `${import.meta.env.BASE_URL}timeline_mirror.html`;

    return (
        <div className="fixed inset-0 w-full h-full z-0">
            <iframe
                src={timelineUrl}
                className="w-full h-full border-none"
                title="NP Heritage Timeline"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
