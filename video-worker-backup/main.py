from src.processor import process_video


input_video = "input/sample.mp4"
output_directory = "output/video-1"


result = process_video(
    input_video,
    output_directory
)


print("\n===================================")
print("         UTube PROCESS RESULT")
print("===================================")

print(f"Status: {result['status']}")


if result["status"] == "READY":

    print(f"Thumbnail: {result['thumbnail']}")
    print(f"Master playlist: {result['master_playlist']}")

else:

    print(f"Error: {result['error']}")