from src.hls import create_360p


video = "input/sample.mp4"
output_dir = "output/360p"

playlist = create_360p(video, output_dir)

print("360p HLS created successfully!")
print(f"Playlist: {playlist}")